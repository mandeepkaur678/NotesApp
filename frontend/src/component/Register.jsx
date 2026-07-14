import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!name) {
        toast.error("Please enter Name");
        return;
      }

      if (!email) {
        toast.error("Please enter Email");
        return;
      }

      if (password !== confirmpassword) {
        toast.error("Password don't match!");
      }

      setLoading(true);

      const payload = {
        name,
        email,
        password,
      };

      const res = await axios.post("http://localhost:5000/user", payload);
      console.log("result: ", res);
      const message = res.data.message;
      toast.success(message);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmpassword("");
      setLoading("");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("User already exist");
      } else {
        toast.error("Something went wrong");
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-[400px] h-[510px] bg-green-100/90 flex justify-center items-center mx-auto my-40 shadow-md shadow-[#0D530E]">
        <div>
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl py-5 text-center">DAILYNOTES</h1>
            <h1 className="text-xl font-bold  font-serif text-center">
              Create your account
            </h1>
            <p className="text-center">
              A quiet place to keep what's worth remembering
            </p>
            <div className="py-4">
              <label>NAME</label>
              <br />
              <input
                type="text"
                placeholder="Ada Lovelace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" bg-white w-full border-b-2 shadow-sm shadow-green-200 py-1 px-2 my-2"
              />
              <br />
              <label>EMAIL</label>
              <br />
              <input
                type="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" bg-white w-full border-b-2 shadow-sm shadow-green-200  py-1 px-2 my-2"
              />
              <br />
              <label>PASSWORD</label>
              <br />
              <input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" bg-white w-full border-b-2 shadow-sm shadow-green-200 py-1 px-2 my-2"
              />
              <br />
              <label>CONFIRM PASSWORD</label>
              <br />
              <input
                type="password"
                placeholder="re-enter your password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                className=" bg-white w-full border-b-2 shadow-sm shadow-green-200 px-2 py-1 my-2 "
              />
              <br />
            </div>

            <button
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
              className={`w-full my-2 bg-[#0D530E] py-2 mb-10 px-7 rounded-lg text-white hover:bg-[#2f8f31] transition duration-500 ${loading ? "cursor-not-allowed" : "bg-[#2f8f31"}`}
            >
              {loading ? "processing" : "Create an Account"}
            </button>

            <p className="text-center pt-4">
              Already have an account?
              <Link
                to="/login"
                className="hover:underline hover:text-green-600"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
