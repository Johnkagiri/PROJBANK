import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";

function Project({ isadmin, isstudent, refresh }) {
  const [click, setClick] = useState(false);
  const [project, setProject] = useState({});
  const [isrequest, setIsrequest] = useState(false);

  const { id } = useParams();
  const sidemenu = classNames(
    " w-1/2 sm:w-1/4 h-screen bg-slate-700 absolute top-0 z-10 sm:left-0 rounded-e-md text-center ",
    {
      "left-0": click,
      "left-[-400px]": !click,
    }
  );

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/project/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data));
  }, [id, refresh]);
  // console.log(project);



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
            <div className="  h-5   text-center text-sm flex flex-row justify-center ">
              <Link to="/adminlogin">
                {" "}
                <div className="  mr-4 bg-blue-300 p-0.5 h-6 ">
                  <p>Login as admin</p>
                </div>
              </Link>
              <div className="bg-slate-600 w-5 rounded-full">k</div>
            </div>
          </div>

          {/* middle section */}

          <button className="float-right bg-blue-600 mt-8  mr-2 rounded-md p-1 text-sm ">
            Githublink
          </button>

          {/* card section */}
          <div className=" w-full sm:w-3/4 sm:ml-auto h-full mt-20 grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 text-center ">
            project here
          </div>

          {/* menu section */}
          
          <Menu
            isadmin={isadmin}
            isrequest={isrequest}
            isstudent={isstudent}
            setIsrequest={setIsrequest}
          />
        </div>
      </div>
    </div>
  );
}

export default Project;
