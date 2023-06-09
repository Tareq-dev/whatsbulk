import React from "react";
import ChartLine from "./../../components/dashboard/ChartLine";
import ChartBar from "./../../components/dashboard/ChartBar";
import DataTable from "../../components/dashboard/DataTable";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";
import { GiHistogram } from "react-icons/gi";
import ChartPie from "../../components/dashboard/Chartpie";

function AdminDashboard() {
  return (
    <div className="mx-4 py-10">
      <div className="flex flex-col md:flex-row my-4">
        <div className="bg-white mx-auto mb-4 md:my-2 md:mx-4 border shadow-lg rounded-xl w-full md:w-60 relative">
          <div className="px-5 py-4">
            <div className="bg-purple-500 p-4 w-16 flex justify-center rounded-md shadow-lg shadow-purple-400 absolute top-[-25px]">
              <FaFileInvoiceDollar className=" text-white" size={36} />
            </div>
            <div className="">
              <h2 className="text-end text-md py-1">Today's Order</h2>
              <p className="py-1 text-end text-lg font-bold">$53k</p>
            </div>
          </div>
          <hr className="my-1" />
          <p className="my-1 text-center text-lg">
            <span className="text-green-500  font-bold">+55%</span> than last
            week
          </p>
        </div>
        <div className="bg-white mx-auto my-4 md:my-2 md:mx-4 border shadow-lg rounded-xl w-full md:w-60 relative">
          <div className="px-5 py-4">
            <div className="bg-[#E53472] p-4 w-16 flex justify-center rounded-md shadow-lg shadow-[#E53472] absolute top-[-25px]">
              <FaUserTie className=" text-white" size={36} />
            </div>
            <div className="">
              <h2 className="text-end text-md py-1">Today's Users</h2>
              <p className="py-1 text-end text-lg font-bold">2,300</p>
            </div>
          </div>
          <hr className="my-1" />
          <p className="my-1 text-center text-lg">
            <span className="text-green-500  font-bold">+5%</span> than last
            month
          </p>
        </div>
        <div className="bg-white mx-auto my-4 md:my-2 md:mx-4 border shadow-lg rounded-xl w-full md:w-60 relative">
          <div className="px-5 py-4">
            <div className="bg-green-500 p-4 w-16 flex justify-center rounded-md shadow-lg shadow-green-500 absolute top-[-25px]">
              <BsPersonFillAdd className=" text-white" size={36} />
            </div>
            <div className="">
              <h2 className="text-end text-md py-1">New Clients</h2>
              <p className="py-1 text-end text-lg font-bold">3,462</p>
            </div>
          </div>
          <hr className="my-1" />
          <p className="my-1 text-center text-lg">
            <span className="text-red-500  font-bold">-2%</span> than yesterday
          </p>
        </div>
        <div className="bg-white mx-auto my-4 md:my-2 md:mx-4 border shadow-lg rounded-xl w-full md:w-60 relative">
          <div className="px-5 py-4">
            <div className="bg-orange-500 p-4 w-16 flex justify-center rounded-md shadow-lg shadow-orange-500 absolute top-[-25px]">
              <GiHistogram className=" text-white" size={36} />
            </div>
            <div className="">
              <h2 className="text-end text-md py-1">Sales</h2>
              <p className="py-1 text-end text-lg font-bold">$103,430</p>
            </div>
          </div>
          <hr className="my-1" />
          <p className="my-1 text-center text-lg">
            <span className="text-green-500  font-bold">-5%</span> than
            yesterday
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center my-8">
        <div className="mx-4 bg-white w-80 px-4 mb-4 border shadow-lg p-4 rounded-3xl">
          <ChartLine />
        </div>
        <div className="bg-white  mx-4 w-80 px-4 mb-4 border shadow-lg p-4 rounded-3xl">
          <ChartBar />
        </div>
        <div className="bg-white  mx-4 w-80 px-4 mb-4 border shadow-lg p-4 rounded-3xl">
          <ChartPie />
        </div>
      </div>
      <DataTable />
    </div>
  );
}

export default AdminDashboard;
