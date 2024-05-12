import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../utils/http";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    setLoading(true);
    http.get("/users").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  };

  const deleteUser = (id) => {
    http.delete("/users/" + id).then(() => {
      fetchAllUsers();
    });
  };
  return (
    <div>
      <h2>Users Listing</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && users.length === 0 && (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          )}
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  className="btn btn-secondary text-black me-2"
                  to={{ pathname: "/edit/" + user.id }}
                >
                  Edit
                </Link>
                <Link
                  className="btn btn-secondary text-black me-2"
                  to={{ pathname: "/view/" + user.id }}
                >
                  View
                </Link>
                <button
                  type="button"
                  className="btn btn-secondary text-black"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
