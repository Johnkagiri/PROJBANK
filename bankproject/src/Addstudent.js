import React from "react";
import { useFormik } from "formik";
import { enqueueSnackbar, useSnackbar } from "notistack";

function Addstudent({ setRefresh, refresh }) {
    const formik = useFormik({
        initialValues: {
          name:"",  
          email: "",
          cohort: "",
        },
        onSubmit: (values) => {
          fetch("http://127.0.0.1:8000/student", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if (res.status == 200) {
              console.log("succesfull");
              enqueueSnackbar("Student added succesfully ", { variant: "success" });
              setRefresh(!refresh)
            }
          });
        },
      });
    
  return (
    <div>
      <div className=" border-2 h-screen flex justify-center ">
        <div className="bg-slate-200  w-2/3 sm:w-1/3 h-full p-3 flex flex-col items-center justify-center ">
          <h3 className="">Add Student form</h3>
          <form onSubmit={formik.handleSubmit} className=" mt-7 ">
          <label className="text-gray-600">Name</label>
            <input
              
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className=" w-full bg-gray-300 rounded-md  "
            />
            <label className="text-gray-600 ">Email</label>
            <input
              id="email"
              email="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className=" w-full bg-gray-300 rounded-md "
            />
            <label className="text-gray-600 ">Cohort</label>
            <input
              
              id="cohort"
              name="cohort"
              onChange={formik.handleChange}
              value={formik.values.cohort}
              className=" w-full bg-gray-300 rounded-md "
            />
            <button
              type="submit"
              className="mt-3 w-full bg-blue-500 text-white rounded-md "
            >
              Add Student
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Addstudent;
