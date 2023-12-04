import React, { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Adminhome() {
  const [click, setClick] = useState(false);

  const sidemenu = classNames(
    " w-1/2 sm:w-1/4 h-full bg-slate-700 absolute top-0 z-10 sm:left-0 rounded-e-md text-center ",
    {
      "left-0": click,
      "left-[-400px]": !click,
    }
  );

  return (
    <div>
      <div className="h-full">
        <div className=" w-full h-full relative p-2">
          {/* top part */}
          <div className=" w-full h-full flex items-center justify-between mt-3 p-1">
            {/* bars */}
            <div className=" flex justify-between w-1/3">
              {" "}
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
              </button>{" "}
              <p className="text-sm">welcome</p>
            </div>
            {/* icon */}
            <div className=" w-5 h-5 bg-slate-600 rounded-full text-center text-sm ">
              k
            </div>
          </div>

          {/* middle section */}
          <div className=" w-full sm:w-3/4 sm:ml-auto h-full flex justify-between mt-8">
            <h2 className="p-1">Discover</h2>
            <div className="w-4/6 flex justify-end p-1">
              <input className="w-full bg-slate-300 rounded-s-md" />
              <button className="bg-slate-300 rounded-e-md p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </button>
            </div>
          </div>
         <Link to='/addstudent' > <button className="float-right bg-blue-400 mt-8   rounded-md p-1 text-sm ">
            Add Student
          </button></Link>
          {/* card section */}
          <div className=" w-full sm:w-3/4 sm:ml-auto h-full mt-20 grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 text-center ">
            {/* cards */}
            <div className="w-full  bg-slate-300 h-full rounded-md pt-3">
              <h3>Project name</h3>
              <p>Project description</p>
              <p>authors</p>
              <button className="float-right bg-blue-400 mt-8   rounded-md p-1 text-sm ">
                Add
              </button>
              <button className="float-right bg-red-400 mt-8   rounded-md p-1 text-sm ">
                Decline
              </button>
            </div>
            <div className="w-full  bg-slate-300 h-full rounded-md pt-3">
              <h3>Project name</h3>
              <p>Project description</p>
              <p>authors</p>
              <button className="float-right bg-blue-400 mt-8   rounded-md p-1 text-sm ">
                Add
              </button>
              <button className="float-right bg-red-400 mt-8   rounded-md p-1 text-sm ">
                Decline
              </button>
            </div>
            <div className="w-full  bg-slate-300 h-full rounded-md pt-3">
              <h3>Project name</h3>
              <p>Project description</p>
              <p>authors</p>
              <button className="float-right bg-blue-400 mt-8   rounded-md p-1 text-sm ">
                Add
              </button>
              <button className="float-right bg-red-400 mt-8   rounded-md p-1 text-sm ">
                Decline
              </button>
            </div>
            <div className="w-full bg-slate-300 h-full rounded-md pt-3">
              <h3>Project name</h3>
              <p>Project description</p>
              <p>authors</p>
              <button className="float-right bg-blue-400 mt-8   rounded-md p-1 text-sm ">
                Add
              </button>
              <button className="float-right bg-red-400 mt-8   rounded-md p-1 text-sm ">
                Decline
              </button>
            </div>
          </div>

          {/* menu section */}
          <div className={sidemenu}>
            <div className="w-24 bg-slate-400 m-auto mt-10 rounded-lg h-10 p-2 ">
              <h2>LOGO</h2>
            </div>
            <div className="mt-20 text-white text-center ">
              <h4 className="mt-3">Discover</h4>
              <h4 className="mt-3">Projects</h4>
              <h4 className="mt-3">Cohort</h4>
              <h4 className="mt-3">People</h4>
              <h4 className="mt-3">Languages</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminhome;
