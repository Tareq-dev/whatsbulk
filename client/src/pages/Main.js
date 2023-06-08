import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import Ably from "ably";
import { saveAs } from "file-saver";
import Loading from "./../components/Loading";
import Form from "./../components/Form";
import MessageCountNav from "../components/MessageCountNav";

function Main({ currentUser, setCurrentUser, coinBalance, setCoinBalance }) {
  const [qrSrc, setQrSrc] = useState([]);
  const [hideQr, setHideQr] = useState(false);
  const [readyMessage, setReadyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [loadingData, setLoadingData] = useState("");
  const [data, setData] = useState();
  const [client, setClient] = useState();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  useEffect(() => {
    const ably = new Ably.Realtime({
      key: "VSU5GA.7M4Y5Q:4Tok9TlkaNq5T8u5dKnJ42pu3oZrH0GYqKpkNPVqsHE",
    });

    const channel = ably.channels.get("my-whatapp");
    const channelQr = ably.channels.get("scan");
    setLoading(true);

    channelQr.subscribe((message) => {
      const qr = message.data;
      if (qr) {
        QRCode.toDataURL(qr).then(setQrSrc);
        setLoading(false);
      }
    });
    channel.subscribe((message) => {
      setReadyMessage(`${message.data}`);
      setHideQr(true);
    });

  
    const channel2 = ably.channels.get("loading-messages");
    const channel3 = ably.channels.get("user");

    channel2.subscribe("loading-messages", (message) => {
      setLoadingData(message.data);
      if (message.data === "All messages sent!") {
        setLoadingData(null);
        setThanks(true);
      }
    });
    channel3.subscribe("user", (message) => {
      setClient(message.data);
    });

    // return () => {
    //   ably.close();
    // };
  }, [data]);
  useEffect(() => {
    setLoadingData("Loading...");
    setTimeout(() => {
      setLoadingData(null);
    }, 2000); // close after 2 seconds
  }, []);
  const handleDownload = () => {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8" });
    const fileName = `${client.user_number}-${client.user_name}.csv`;
    saveAs(blob, fileName);
  };
  const modalRef = useRef();
  function handleModalClick(event) {
    if (event.target === modalRef.current) {
      setThanks(false);
    }
  }
  return (
    <div className="">
      <MessageCountNav
      currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        coinBalance={coinBalance}
      />

      {thanks ? (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
          onClick={handleModalClick}
        >
          <div className="modal-box relative bg-green-200 rounded-lg md:p-8">
            <div className="flex justify-center items-center py-5">
              <div className="bg-gray-600 text-white md:px-6 py-14 md:py-24 rounded-lg">
                <p className="font-semibold text-center text-lg mb-2">✅✅✅</p>
                <p className="font-semibold text-center text-lg mb-2">
                  Thanks for using our service!
                </p>
                <p className="text-white text-center">
                  We appreciate your business and hope to see you again soon.
                </p>
                <div className="flex justify-center items-center">
                  <div className="pt-4">
                    <button
                      className="bg-green-500 px-2 py-1 rounded-sm text-white font-semibold"
                      onClick={handleDownload}
                    >
                      Download Logs File 💾
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {hideQr ? (
            <Form
              loadingData={loadingData}
              readyMessage={readyMessage}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              setData={setData}
              setCoinBalance={setCoinBalance}
              coinBalance={coinBalance}
              currentUser={currentUser}
            />
          ) : (
            <div className="py-8 md:py-16 my-8 md:my-16 px-8 bg-white md:flex md:justify-center items-center md:mx-64">
              <div>
                <h1 className="text-2xl font-bold mb-6">
                  Use WhatsApp On your computer
                </h1>
                <ul>
                  <li>1. Open WhatsApp from your phone </li>
                  <li>
                    2. Tap <strong>Menu</strong> or <strong>Setting</strong> and
                    select <strong>Linked Devices</strong>{" "}
                  </li>
                  <li>
                    3. Tap on <strong> Link a device </strong>
                  </li>
                  <li>
                    4. Point your mobile to this screen to capture the QR code
                  </li>
                </ul>
              </div>
              <div className="border md:ml-12 mt-10 md:mt-1">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="flex justify-center items-center">
                    <img className="w-[200px]" src={qrSrc} alt="" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
