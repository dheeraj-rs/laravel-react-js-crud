import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../utils/http";

function View() {
  const [inputs, setInputs] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = () => {
    http.get("/users/" + id + "/edit").then((res) => {
      setInputs({
        name: res.data.name,
        email: res.data.email,
      });
    });
  };
  return (
    <div className="text-light py-4">
      <h2>View User</h2>
      <div className="row">
        <div className="col-sm-6">
          <div className="card bg-dark border-light p-4">
            <h4 className="text-light">Name</h4>
            <p className="text-light">{inputs.name}</p>
            <h4 className="text-light">Email</h4>
            <p className="text-light">{inputs.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
