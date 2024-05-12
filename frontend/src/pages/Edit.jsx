import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../utils/http";

function Edit() {
  const navigate = useNavigate();
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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = () => {
    http.put("/users/" + id, inputs).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="text-light py-4">
      <h2>Edit User</h2>
      <div className="row">
        <div className="col-sm-6">
          <div className="card bg-dark border-light p-4">
            <label className="text-light">Name</label>
            <input
              type="text"
              name="name"
              className="form-control mb-2 bg-dark text-light border-light"
              value={inputs.name || ""}
              onChange={handleChange}
            />
            <label className="text-light">Email</label>
            <input
              type="email"
              name="email"
              className="form-control mb-2 bg-dark text-light border-light"
              value={inputs.email || ""}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={submitForm}
              className="btn btn-secondary mt-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
