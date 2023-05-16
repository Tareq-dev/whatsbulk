const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Ably = require("ably");
const db = require("./db.js");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
// const randomstring = require("randomstring");
const bcrypt = require("bcryptjs");
const csv = require("csv-express");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const port = process.env.PORT || 5000;

const client = new Client({ authStrategy: new LocalAuth() });
// const client = new Client({
//   authStrategy: new LocalAuth(),
//   puppeteer: {
//     args: ["--no-sandbox"],
//   },
// });
// const client = new Client({
//   puppeteer: {
//     headless: true,
//   },
//   authStrategy: new LocalAuth({
//     clientId: "YOUR_CLIENT_ID",
//   }),
// });

const ably = new Ably.Realtime(
  "VSU5GA.7M4Y5Q:4Tok9TlkaNq5T8u5dKnJ42pu3oZrH0GYqKpkNPVqsHE"
);
const channel = ably.channels.get("scan");
const channel1 = ably.channels.get("my-whatapp");
const channel2 = ably.channels.get("loading-messages");
const channel3 = ably.channels.get("user");

client.on("qr", (qr) => {
  channel.publish("qr", qr);
});

client.on("ready", () => {
  console.log("client is ready");
  const user = {
    user_number: client.info.me.user,
    user_name: client.info.pushname,
  };

  channel1.publish("client-ready", "Client is ready!");
  channel3.publish("user", user);
});

const checkRegisteredNumber = async function (number) {
  const isRegistered = await client.isRegisteredUser(number);
  return isRegistered;
};

const makingCsv = (Registered, Unregistered, res) => {
  const csvData = [
    ["Mobile No", "Status", "Reason"],
    ...Registered.map((r) => r.split(",")),
    ...Unregistered.map((r) => r.split(",")),
  ];

  const fileName = `${client.info.me.user}-${client.info.pushname}.csv`;
  res.attachment(fileName);
  res.csv(csvData, fileName);
};

app.post("/register", async (req, res) => {
  // CHECK FOR EXISTING USER
  const q = "SELECT * FROM register WHERE email = ?";
  db.query(q, [req.body.email], (error, data) => {
    if (error) return res.json(error);
    if (data.length)
      return res
        .status(422)
        .json({ status: 0, message: "User already exists!" });
    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // return false;
    const q = "INSERT INTO register (email, message, password) VALUES (?)";
    const values = [req.body.email, req.body.message, hashedPassword];
    db.query(q, [values], (error, data) => {
      // console.log("data", data);
      if (error) return res.json(error);
      const query = "SELECT * FROM register WHERE id = ?";
      db.query(query, [data.insertId], (error, signInData) => {
        if (error) return res.json(error);
        const token = jwt.sign({ id: signInData[0].id }, "jwtkey");
        const { password, ...rest } = signInData[0];
        return res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ status: 1, data: rest, message: "User has been created!" });
      });
    });
  });
});

app.get("/user", (req, res) => {
  const email = req.query.email;
  const q = "SELECT * FROM register WHERE email = ?";
  db.query(q, [email], (error, data) => {
    const result = {
      email: data[0].email,
      message: data[0].message,
    };
    res.send(result);
  });
});
app.post("/update-message-count", (req, res) => {
  // const data = req.body;
  // console.log(data);
  const q = "SELECT * FROM register WHERE email = ?";
  db.query(q, [req.body.email], (error, data) => {
    const query = `UPDATE register SET message = ? WHERE email=? `;
    db.query(
      query,
      [req.body.remainBalance, req.body.email],
      (err, result) => {}
    );
  });
});

app.post("/login", async (req, res) => {
  // CHECK USER EXISTS

  const q = "SELECT * FROM register WHERE email = ?";
  try {
    db.query(q, [req.body.email], (error, data) => {
      if (error) return res.json(error);

      if (data.length === 0)
        return res.status(404).json({ status: 0, message: "User not found!" });

      // CHECK PASSWORD
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      9;
      if (!isPasswordCorrect) {
        return res.status(400).json({ status: 0, message: "Wrong Password!" });
      }

      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...rest } = data[0];

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ status: 1, data: rest, message: "Login successful!" });
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/logout", async (req, res) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ status: 1, message: "Logout successful!" });
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Function to send a message
const sendMessage = (id, email) => {
  // Check if the user has enough balance
  connection.query(
    "SELECT message FROM register WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error retrieving message count:", err);
        return;
      }

      const messageCount = results[0].message;
      if (messageCount > 0) {
        // Update the message count in the database
        connection.query(
          "UPDATE register SET message = ? WHERE id = ?",
          [messageCount - 1, id],
          (err) => {
            if (err) {
              console.error("Error updating message count:", err);
              return;
            }

            console.log("Message sent successfully");

            // TODO: Send the message to the user
          }
        );
      } else {
        console.log("You have not enough balance");
      }
    }
  );
};

app.post("/send-message", async (req, res) => {
  const number = req.body.whatsappNumber;
  const text = req.body.message;
  const CSVData = JSON.parse(req.body.CSVData);
  try {
    // Single number
    if (number && text) {
      const isRegisteredNumber = await checkRegisteredNumber(number);

      if (isRegisteredNumber) {
        const sanitized_number = number.toString().replace(/[- )(]/g, "");
        const number_details = await client.getNumberId(sanitized_number);
        // get mobile number details
        if (number_details) {
          await client.sendMessage(number_details._serialized, text);
          return res.send({ message: "Message send successfully" });
        }
      } else {
        return res.send({ status: 201 });
      }
    }
    //Multiple Number

    if (CSVData && text) {
      //Loading message during sending message
      async function sendMessageWithDelay(num) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const message = `Sending message to ${num}`;
            channel2.publish("loading-messages", message);
            resolve();
          }, 2000);
        });
      }

      async function sendLoadingMessages() {
        channel2.publish("loading-messages", "Sending messages...");
        for (let i = 0; i < CSVData.length; i++) {
          await sendMessageWithDelay(CSVData[i]);
        }
        channel2.publish("loading-messages", "All messages sent!");
      }

      function showLoadingMessage() {
        const intervalId = setInterval(() => {
          process.stdout.write(".");
        }, 700);

        return () => {
          clearInterval(intervalId);
        };
      }

      const stopLoadingMessage = showLoadingMessage();
      sendLoadingMessages().then(() => {
        stopLoadingMessage();
      });

      // send message to the entered csv data user

      async function sendMessage() {
        const results = await Promise.all(CSVData.map(checkRegisteredNumber));
        // const isAllRegistered = results.every(Boolean);
        const unregisteredNumbers = CSVData.filter(
          (number, index) => !results[index]
        );
        const registeredNumbers = CSVData.filter(
          (number, index) => results[index]
        );

        const Unregistered = unregisteredNumbers.map(
          (num, index) =>
            `${num}, Fail, This mobile number is not registered in whatsapp`
        );
        const Registered = registeredNumbers.map(
          (num, index) => `${num}, Sent`
        );
        makingCsv(Registered, Unregistered, res);

        //sending message
        for (const phoneNumber of registeredNumbers) {
          const number_details = await client.getNumberId(phoneNumber);
          await client.sendMessage(number_details._serialized, text);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
      sendMessage();
    }
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/send-media", async (req, res) => {
  const number = req.body.whatsappNumber;
  const text = req.body.message;
  const CSVData = JSON.parse(req.body.CSVData);
  const files = req.files.file;
  try {
    // Single number send media
    if (number && text && files) {
      const isRegisteredNumber = await checkRegisteredNumber(number);

      if (isRegisteredNumber) {
        const chatId = number + "@c.us";
        const media = new MessageMedia(
          files.mimetype,
          files.data.toString("base64"),
          files.name
        );
        await client.sendMessage(chatId, media, {
          caption: text,
        });
        return res.send({ message: "Message send successfully" });
      } else {
        return res.send({ status: 201 });
      }
    }
    //Multiple Number
    if (CSVData && text && files) {
      const hasNull = CSVData.includes(null);

      if (!hasNull) {
        //Loading message during sending message
        async function sendMessageWithDelay(num) {
          return new Promise((resolve) => {
            setTimeout(() => {
              const message = `Sending message to ${num}`;
              channel2.publish("loading-messages", message);
              resolve();
            }, 2000);
          });
        }

        async function sendLoadingMessages() {
          channel2.publish("loading-messages", "Sending messages...");
          for (let i = 0; i < CSVData.length; i++) {
            await sendMessageWithDelay(CSVData[i]);
          }
          channel2.publish("loading-messages", "All messages sent!");
        }

        function showLoadingMessage() {
          const intervalId = setInterval(() => {
            process.stdout.write(".");
          }, 700);

          return () => {
            clearInterval(intervalId);
          };
        }

        const stopLoadingMessage = showLoadingMessage();
        sendLoadingMessages().then(() => {
          stopLoadingMessage();
        });

        async function sendMessage() {
          const results = await Promise.all(CSVData.map(checkRegisteredNumber));
          const unregisteredNumbers = CSVData.filter(
            (number, index) => !results[index]
          );
          const registeredNumbers = CSVData.filter(
            (number, index) => results[index]
          );

          const Unregistered = unregisteredNumbers.map(
            (num, index) =>
              `${num}, Fail, This mobile number is not registered in whatsapp`
          );
          const Registered = registeredNumbers.map(
            (num, index) => `${num}, Sent`
          );
          makingCsv(Registered, Unregistered, res);

          for (const phoneNumber of registeredNumbers) {
            // const sanitized_number = phoneNumber
            //   .toString()
            //   .replace(/[- )(]/g, "");
            const chatId = phoneNumber + "@c.us";
            const media = new MessageMedia(
              files.mimetype,
              files.data.toString("base64"),
              files.name
            );
            await client
              .sendMessage(chatId, media, {
                caption: text,
              })
              .then((response) => {})
              .catch((err) => {
                console.log(err);
              });
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        }
        sendMessage();
      } else {
        console.log("Your csv file has null value");
      }
    }
  } catch (error) {
    return res.send({ error: "Please provide country code and valid number" });
  }
});

client.initialize();

app.get("/", (req, res) => {
  res.send("Hello World of ph");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
