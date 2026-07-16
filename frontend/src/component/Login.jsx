import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlelogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/user/login`, { email, password });

      if (res.data.success) {
        const message = res.data.message;
        toast.success(message);

        setEmail("");
        setPassword("");

        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/notes");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-[380px] h-[450px] bg-green-100/90 flex justify-center items-center mx-auto my-40 shadow-md shadow-[#0D530E]">
        <div className="">
          <h1 className="text-2xl py-5 text-center"> DAILYNOTES</h1>
          <h1 className="text-xl font-bold  font-serif text-center">
            Welcome back
          </h1>
          <p className="text-center py-1">
            Sign in to pick up where your notes left off
          </p>
          <div className="py-4">
            <label className="">EMAIL</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-white w-full border-b-2 shadow-sm shadow-green-200 my-2 py-1 "
            />
            <br />
            <div className="justify-end py-2">
              <label className="justify-between inline py-2">PASSWORD</label>
              <button className="pl-40 hover:text-green-600 hover:underline">
                Forgot?
              </button>
              <br />

              <input
                type="password"
                placeholder="......"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white w-full border-b-2 shadow-sm shadow-green-200 my-2 py-1"
              />
              <br />
            </div>
          </div>
          <button
            onClick={handlelogin}
            disabled={loading}
            className={`bg-[#0D530E] w-full py-2 px-7 rounded-sm text-white hover:bg-[#2f8f31] transition duration-500  ${loading ? "cursor-not-allowed" : "bg-[#2f8f31]"}`}
          >
            {loading ? "Signing in..." : "Sign in "}
          </button>

          <p className="text-center pt-4">
            New to DailyNotes?
            <Link
              to="/register"
              className="hover:underline hover:text-green-600"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
