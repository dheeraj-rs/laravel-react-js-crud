import { useState } from "react";
import { useNavigate } from "react-router-dom";
import https from "../utils/http";

function Create() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = () => {
    https.post("/users", inputs).then(() => {
      navigate("/");
    });
  };
  return (
    <div className="text-light py-4">
      <h2>New User</h2>
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

            <label className="text-light">Password</label>
            <input
              type="password"
              name="password"
              className="form-control mb-2 bg-dark text-light border-light"
              value={inputs.password || ""}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={submitForm}
              className="btn btn-secondary mt-2"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
