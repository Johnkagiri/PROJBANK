import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

function Studentlogin({
  setisloggedin,
  user,
  setUser,
  setIsstudent,
  setIsadmin,
  refresh,
  setRefresh,
}) {
  
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    setFormdata({
      ...formdata,
      [name]: value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const loginResponse = await fetch("http://127.0.0.1:8000/studentlogin", {
        method: "POST",
        mode: "cors",
        credentials: "include", // "same-origin" may also work
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      if (loginResponse.status === 200) {
        console.log("Login successful");

        const data = await loginResponse.json();

        setUser(data);
        setisloggedin(true);
        setIsstudent(true);
        setIsadmin(false);
        setRefresh(!refresh);
        navigate("/");
        // console.log(user);
        // // Fetch session after a successful login
        // const sessionResponse = await fetch("http://127.0.0.1:8000/session", {
        //   method: "GET",
        //   mode: "cors",
        //   credentials: "include", // "same-origin" may also work
        // });
        // const sessionData = await sessionResponse.json();

        // // console.log("Session data:", sessionData);

        // if (sessionData.session !== null) {
        //   // Session is not null, handle as needed
        // } else {
        //   // Session is null, handle as needed
        // }
      } else {
        console.log("Login failed");
        // Handle unsuccessful login
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error during login
    }
  }

  return (
    <div>
      <div className="h-screen p-3 ">
        <div className=" h-16 bg-slate-400 flex flex-row justify-between p-3 ">
          <Link to="/">
            <h1 className="  mt-2 bg-slate-300 rounded-md h-3/4 p-1 text-sm ">
              logo
            </h1>
          </Link>
          <Link to="/adminlogin">
            <button className="bg-blue-400 h-3/4  mt-2 p-1 text-sm text-white rounded-lg ">
              Login as Admin
            </button>
          </Link>
        </div>
        <div className="  bg-slate-200  w-2/3 sm:w-1/3 m-auto h-screen p-3 flex flex-col items-center justify-start mt-9">
          <h3 className="">Student Login</h3>
          <form onSubmit={handleSubmit} className=" mt-7 ">
            <label className="text-gray-600">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              value={formdata.email}
              className=" w-full bg-gray-300 "
            />
            <label className="text-gray-600 ">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formdata.password}
              className=" w-full bg-gray-300 "
            />
            <p className="text-blue-500 text-xs mt-2 text-right ">
              Forgot password?
            </p>
            <button
              type="submit"
              className="mt-3 w-full bg-blue-500 text-white "
            >
              Login
            </button>
          </form>
          <button className="mt-7 text-blue-500 text-xs ">
            Change password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Studentlogin;
