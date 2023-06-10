import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  // base
  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    fetch(`${baseUrl}/api/all-users`)
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, [baseUrl]);

  return [users, setUsers];
};
export default useUsers;
