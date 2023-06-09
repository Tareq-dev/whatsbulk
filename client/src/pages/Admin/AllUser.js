import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

function AllUser() {
  const [user, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

  const [updatedMessage, setUpdatedMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust the number of items per page as needed

  const openModal = (email) => {
    setSelectedEmail(email);

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const baseUrl = process.env.REACT_APP_BASE_URL2;
  useEffect(() => {
    fetch(`${baseUrl}/api/all-users`)
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, [isOpen]);

  const makeAdmin = (email) => {
    fetch(`${baseUrl}/api/make-admin/${email}`, {
      method: "POST",
    })
      .then((response) => response.text())
      .then((data) => {
        toast.success(`${data}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const updateBalance = () => {
    fetch(`${baseUrl}/api/update-balance/${selectedEmail}/${updatedMessage}`, {
      method: "POST",
    })
      .then((response) => response.text())
      .then((data) => {
        toast.success(`${data}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUpdatedMessage("");
        setIsOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const filteredUsers = user.filter((u) =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      <p className="text-center py-5 md:text-4xl">All Users</p>
      <div className="mb-4 flex justify-center w-full">
        <div>
          <input
            type="text"
            className="border outline-none  rounded-md px-4 py-2 "
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto px-2">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Email</th>
              <th>Role</th>
              <th>Balance</th>
              <th>Update</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((u, i) => (
              <tr user={u} key={i}>
                <td>{i + 1}</td>
                <td>{u?.email}</td>
                <td>{u?.role ? "Admin" : "User"}</td>
                <td>{u?.message}</td>
                <td>
                  <button
                    className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => openModal(u?.email, u?.message)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  {u?.role !== "admin" ? (
                    <button
                      onClick={() => makeAdmin(u?.email)}
                      className="btn btn-xs btn-success text-white"
                    >
                      make Admin
                    </button>
                  ) : (
                    "Already Admin"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-8">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center items-center mt-4"}
          previousLinkClassName={
            "px-3 py-1 bg-gray-300 ml-2 font-bold rounded-lg"
          }
          nextLinkClassName={"px-3 py-1 bg-gray-300 ml-2 font-bold rounded-lg"}
          disabledClassName={"invisible"}
          activeClassName={"bg-green-600 text-white"}
          pageClassName={"rounded-lg bg-purple-500 mx-4"}
          pageLinkClassName={"px-4 py-1 rounded-lg hover:bg-green-400 "}
        />
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-200 p-4 w-80 rounded-lg border relative">
            <h2 className="text-xl font-bold mb-4">Update message balance</h2>
            <p className="mb-4">For: {selectedEmail}</p>
            <div className="flex justify-center">
              <div>
                <input
                  className="px-4 py-1 block rounded-md outline-none"
                  placeholder="Enter Number"
                  onChange={(e) => setUpdatedMessage(e.target.value)}
                  value={updatedMessage}
                  type="number"
                  min="0"
                />
                <div className="mt-4 flex justify-center">
                  <button
                    className="bg-green-400 px-4 py-1 text-white font-bold rounded-md"
                    onClick={updateBalance}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={closeModal}
              htmlFor=""
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUser;
