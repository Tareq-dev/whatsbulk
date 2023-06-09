import React from "react";
import useUsers from "./../../components/Hooks/useUsers";

function AllAdmins() {
  const [users] = useUsers([]);
  const admin = users.filter((u) => u.role === "admin");

  const removeUser = (email) => {
    // fetch(`https://aziza-fashion-world.onrender.com/user/${email}`, {
    //     method: "DELETE",
    // })
    //     .then((res) => res.json())
    //     .then((data) => {
    //     });
  };

  return (
    <div>
      <p className="text-center py-5 md:text-4xl">All Admin</p>

      <div className="overflow-x-auto px-2">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {admin.map((user, i) => (
              <tr user={user} key={i}>
                <td>{i + 1}</td>
                <td>{user?.email} </td>
                <td>{user?.role ? "Admin" : "User"}</td>
                <td>
                  <button
                    onClick={() => removeUser(user?.email)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Remove User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAdmins;
