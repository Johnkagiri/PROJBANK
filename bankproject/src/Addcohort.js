import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";

function Addcohort({ user }) {
  
  const navigate = useNavigate();
  console.log(user.id);
  const formik = useFormik({
    initialValues: {
      name: "",
      startdate: "",
      enddate: "",
      adminId: user.id,
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://127.0.0.1:8000/cohort", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.status === 200) {
          console.log("Login successful");
          enqueueSnackbar('Succesfully added cohort', {variant:'success'} )
          const data = await response.json();
          console.log(data);
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
            {" "}
            <h1 className="  mt-2 bg-slate-300 rounded-md h-3/4 p-1 text-sm ">
              logo
            </h1>
          </Link>
          <Link to="/studentlogin">
            <button className="bg-blue-400 h-3/4  mt-2 p-1 text-sm text-white rounded-lg ">
              Login as Student
            </button>
          </Link>
        </div>
        <div className="  bg-slate-200  w-2/3 sm:w-1/3 m-auto h-screen p-3 flex flex-col items-center justify-start mt-9">
          <h3 className="">Cohort</h3>
          <form onSubmit={formik.handleSubmit} className=" mt-7 ">
            <label className="text-gray-600">Name</label>
            <input
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className=" w-full bg-gray-300 text-sm text-slate-700 "
            />
            <label className="text-gray-600 ">Start date</label>
            <input
              id="startdate"
              name="startdate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.startdate}
              className=" w-full bg-gray-300 text-sm text-slate-700 "
            />
            <label className="text-gray-600">End date</label>
            <input
              id="enddate"
              name="enddate"
              type="date" // Set the type to "date"
              onChange={formik.handleChange}
              value={formik.values.enddate}
              className="w-full bg-gray-300 text-sm text-slate-700"
            />

            <button
              type="submit"
              className="mt-3 w-full bg-blue-500 text-white "
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addcohort;
