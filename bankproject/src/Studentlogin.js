import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

function Studentlogin({ setisloggedin }) {
  const [refresh, setRefresh] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const loginResponse = await fetch("http://127.0.0.1:8000/studentlogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        if (loginResponse.status === 200) {
          console.log("Login successful");
          setisloggedin(true);
          setRefresh(!refresh);
  
          const data = await loginResponse.json();
  
          console.log("Data:", data);
  
          // Fetch session after a successful login
          const sessionResponse = await fetch("http://127.0.0.1:8000/session");
          const sessionData = await sessionResponse.json();
  
          console.log("Session data:", sessionData);
  
          if (sessionData.session !== null) {
            // Session is not null, handle as needed
          } else {
            // Session is null, handle as needed
          }
        } else {
          console.log("Login failed");
          // Handle unsuccessful login
        }
      } catch (error) {
        console.error("Error during login:", error);
        // Handle error during login
      }
    },
  });
  

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
          <form onSubmit={formik.handleSubmit} className=" mt-7 ">
            <label className="text-gray-600">Email</label>
            <input
              id="email"
              email="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className=" w-full bg-gray-300 "
            />
            <label className="text-gray-600 ">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
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
