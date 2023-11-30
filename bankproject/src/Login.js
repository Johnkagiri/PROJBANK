import React from "react";
import { useFormik } from "formik";

function Login() {
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: (values) => {
      fetch("http://127.0.0.1:8000/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.status == 200) {
          console.log("succesfull");
        }
      });
    },
  });

  return (
    <div>
      <div className=" border-2 border-red-500 h-screen ">
        <div className="bg-white-500 border-2 border-solid border-red-500 w-2/3 sm:w-1/3 ml-auto h-full p-3 flex flex-col items-center justify-center ">
          <h3 className="">Login</h3>
          <form onSubmit={formik.handleSubmit} className=" mt-7 ">
            <label className="text-gray-600">Name</label>
            <input
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className=" w-full bg-gray-200 "
            />
            <label className="text-gray-600 ">Password</label>
            <input
            type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className=" w-full bg-gray-200 "
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

export default Login;
