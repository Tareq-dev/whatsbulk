import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { FiAlertOctagon } from "react-icons/fi";
import { useAuth } from "./context/auth";

function Form({
  coinBalance,
  currentUser,
  setCoinBalance,
  selectedOption,
  handleOptionChange,
  readyMessage,
  loadingData,
  setData,
}) {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [balanceAlert, setBalanceAlert] = useState(false);
  const auth = useAuth();

  const email = auth?.user?.email;
  const [CSVData, setCSVData] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL2;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data;
        const phoneNumbers = data.map((contact) => contact.phoneNumber);
        setCSVData(phoneNumbers);
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sanitized_number = whatsappNumber.toString().replace(/[-+ )(]/g, "");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("whatsappNumber", sanitized_number);
    formData.append("message", message);
    formData.append("CSVData", JSON.stringify(CSVData));
    if (!file) {
      try {
        const response = await axios.post(
          `${baseUrl}/api/send-message`,
          formData
        );
        setData(response.data);

        if (response.data.status === 201) {
          toast.error("Unregistered number", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        if (response.data.success) {
          toast.success(`${response.data.message}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setWhatsappNumber("");
          setMessage("");
          setFile(null);
        }
        if (response.data.success === 0) {
          toast.error(`${response.data.message}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setBalanceAlert(true);
          setWhatsappNumber("");
          setMessage("");
          setFile(null);
        }
      } catch (error) {
        if (error) {
          toast.error("Somethings wronge provided", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }
    if (file) {
      try {
        const response = await axios.post(
          `${baseUrl}/api/send-media`,
          formData
        );
        if (response.data.status === 201) {
          toast.error("Unregistered number", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        if (response.data.success) {
          toast.success(`🚀${response.data.message}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setWhatsappNumber("");
          setMessage("");
          setFile(null);
        }
        if (response.data.success === 0) {
          toast.error(`${response.data.message}`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setBalanceAlert(true);
          setWhatsappNumber("");
          setMessage("");
          setFile(null);
        }
      } catch (error) {}
    }
  };

  const handlePhoneChange = (event) => {
    setWhatsappNumber(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const modalRef = useRef();
  function handleModalClick(event) {
    if (event.target === modalRef.current) {
      setBalanceAlert(false);
    }
  }
  return (
    <div className="flex justify-center items-center mt-8">
      {balanceAlert ? (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
          onClick={handleModalClick}
        >
          <div className="modal-box relative bg-green-200 rounded-lg p-8">
            <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in-down">
              <p className="flex justify-center pb-4 text-red-500">
                <FiAlertOctagon className="" size={44} />
              </p>
              <p className="text-red-500 text-lg font-medium mb-4 text-center">
                Your Massage balance is finished.
              </p>
              <p className="text-black text-md text-center">
                Please contact our admin to add more balance to your account.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col items-center my-4 bg-green-100 py-5 md:pb-10 px-6 md:px-20"
        >
          {readyMessage ? (
            <div className="flex justify-center items-center mb-4">
              <p className="py-1 px-4 text-center bg-green-500 rounded-md text-white font-semibold text-md ">
                {readyMessage}
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col items-center space-y-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 cursor-pointer"
                name="option"
                value="single"
                checked={selectedOption === "single"}
                onChange={handleOptionChange}
              />
              <span className="ml-2 text-gray-700">Single Person</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 cursor-pointer"
                name="option"
                value="bulk"
                checked={selectedOption === "bulk"}
                onChange={handleOptionChange}
              />
              <span className="ml-2 text-gray-700">Bulk Message</span>
            </label>

            {selectedOption === "single" && (
              <div className="">
                <label
                  htmlFor="phoneNumber"
                  className="text-gray-600 block text-center mb-2  mt-4"
                >
                  Whatsapp Number with country code
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter number with country code"
                  value={whatsappNumber}
                  onChange={handlePhoneChange}
                  className="border border-gray-400 rounded-lg py-2 px-4 w-80 outline-none  "
                  // required
                />
              </div>
            )}

            {selectedOption === "bulk" && (
              <div className="my-2 pb-2 bg-white rounded-md border border-gray-400 mb-2 mt-4">
                <p
                  htmlFor="csv-file"
                  className="px-4 py-2 font-bold bg-gray-300 text-center rounded "
                >
                  Upload CSV File
                </p>
                <div className="flex justify-center items-center">
                  <input
                    id="csv-file"
                    type="file"
                    name="csvFile"
                    accept=".csv"
                    className="w-80 my-4 px-12 cursor-pointer"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            )}
          </div>

          {/* {unReg ? (
            <div>
              <p className="text-red-500 text-center mt-1">
                Unregistered Number -
              </p>
              {unReg?.map((u, i) => (
                <span key={i} className="text-red-500">
                  {u} ,
                </span>
              ))}
            </div>
          ) : (
            ""
          )} */}

          <label htmlFor="message" className="text-gray-600 mb-2 mt-4">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter message"
            value={message}
            onChange={handleMessageChange}
            className="border border-gray-400 rounded-lg py-2 px-4 w-80 h-32 outline-none "
            required
          />

          <div className="flex items-center justify-center w-full ">
            <div className="border border-gray-400 my-2 py-2 rounded-md px-4 flex items-center justify-center bg-white w-[290px] md:w-80">
              <label
                htmlFor="media-upload"
                className="cursor-pointer flex justify-center"
              >
                <div className="flex items-center justify-center ">
                  <AiOutlineCloudUpload className="h-6 w-6 text-gray-500 mr-3 mt-2" />
                  <span className="mt-2 text-base leading-normal text-gray-500">
                    Select file
                  </span>
                  <input
                    id="media-upload"
                    type="file"
                    name="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </div>
              </label>
              {file && (
                <div className="ml-4 mt-2">
                  <p className="text-base leading-normal text-gray-500">
                    {file.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {loadingData ? (
            <div className="fixed top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-1 text-green-500 px-4 py-2 rounded-lg shadow-lg z-50">
              <span role="img" aria-label="Loading">
                🔄
              </span>
              {loadingData}
            </div>
          ) : (
            ""
          )}
          <button
            disabled={loadingData}
            type="submit"
            className={
              loadingData
                ? "bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4 outline-none"
                : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4 outline-none"
            }
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}

export default Form;
