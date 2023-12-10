import React, { useState } from "react";
import Menu from "./Menu";
import { Link } from "react-router-dom";

function Cohorts({
  projects,
  isloggedin,
  user,
  setUser,
  setIsloggedin,
  isadmin,
  isstudent,
  setIsstudent,
  setIsadmin,
  request,
  cohort,
}) {
  const [isrequest, setIsrequest] = useState(false);

  return (
    <div>
      <div className=" relative ">
        <div className=" bg-slate-950 w-full sm:ml-auto h-10 flex flex-row justify-between fixed p-2 z-10 top-0 sm:z-20 sm:left-0 ">
          <div className=" bg-white pt-1.5 ">
            <Link to="/">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="18"
                viewBox="0 0 576 512"
              >
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
              </svg>
            </Link>
          </div>
          <div className=" flex flex-row justify-center  ">
            <input className=" h-6 bg-slate-300 rounded-s-md  " type="text" />{" "}
            <svg
              className="  bg-slate-300 h-6 rounded-e-md pr-0.5 "
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>
          <div className=" text-white flex flex-row justify-center ">
            <p className=" mr-4 text-blue-500 ">My cohorts</p>
            <h2 className=" rounded-full bg-slate-400 w-6 h-6 text-center ">
              p
            </h2>
          </div>
        </div>
        <div className=" text-center mb-3 w-full sm:w-3/4 h-10 top-10 sm:right-0 fixed sm:ml-auto bg-slate-200 opacity-80 ">
          <h1 className=" mt-2 ">All Cohorts</h1>
        </div>

        <Menu
          isadmin={isadmin}
          isrequest={isrequest}
          isstudent={isstudent}
          setIsrequest={setIsrequest}
        />
        <div className="mt-24 sm:ml-auto sm:w-3/4 p-2 ">
          {cohort
            ? cohort.map((data) => (
                <div className=" bg-slate-50 h-32 border-y-2 border-solid border-slate-200 p-2 ">
                  <div className=" flex flex-row justify-between ">
                    <h1 className=" text-blue-500 ml-20 ">{data.name}</h1>
                    <p className=" text-sm text-green-500 ">Active</p>
                  </div>
                  <div className=" ml-40 text-sm mt-1 ">
                    <p>Start date: {data.start_date} </p>
                    <p>End date: {data.end_date} </p>
                    <p>Students: </p>
                  </div>
                  <h2 className=" ml-24 text-sm mt-1 ">Admin: </h2>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Cohorts;
