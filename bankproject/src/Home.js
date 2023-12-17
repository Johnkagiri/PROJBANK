import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Projects from "./Projects";
import Requests from "./Requests";
import Menu from "./Menu";

function Home({
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
  refresh,
  setRefresh
}) {
  const [click, setClick] = useState(false);
  const [isrequest, setIsrequest] = useState(false);
  const [issearch, setIssearch] = useState(false);
  const [search, setSearch] = useState([]);

  // console.log(request);

  function handlelogout() {
    setIsloggedin(false);
    setIsstudent(false);
    setIsadmin(false);
    setUser(null);
    setIsrequest(false);
  }

  function handlesearch(e) {
    if (e.target.value.length === 0) {
      setIssearch(false);
    } else {
      setIssearch(true);
      const lowercasequery = e.target.value.toLowerCase();

      const result = projects.filter((data) =>
        data.name.toLowerCase().includes(lowercasequery)
      );
      // console.log(result);
      setSearch(result);
      return result;
    }
  }
  console.log(issearch);
  console.log(search);

  return (
    <div>
      <div className="h-full">
        <div className=" w-full h-full relative p-2">
          {/* top part */}
          <div className=" w-full h-full flex items-center justify-between mt-3 p-1">
            {/* bars and welcome */}
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
              {isloggedin ? (
                <p className="text-sm">welcome {user.name} </p>
              ) : (
                <p className="text-sm">welcome</p>
              )}
            </div>
            {/* login logout buttons */}
            <div
              onClick={handlelogout}
              className="  h-5   text-center text-sm flex flex-row justify-center "
            >
              {isloggedin ? (
                <Link to="/">
                  <p className="  mr-4 bg-blue-300 p-0.5 h-6 rounded-md ">
                    Log out
                  </p>
                </Link>
              ) : (
                <>
                  <Link to="/adminlogin">
                    <p className="  mr-4 bg-blue-300 p-0.5 h-6 rounded-md ">
                      admin
                    </p>
                  </Link>
                  <Link to="/studentlogin">
                    <p className="  mr-4 bg-blue-300 p-0.5 h-6 rounded-md ">
                      student
                    </p>
                  </Link>
                </>
              )}

              <div className="bg-slate-600 w-5 rounded-full">k</div>
            </div>
          </div>

          {/* middle section */}
          <div className=" w-full sm:w-3/4 sm:ml-auto h-full flex justify-between mt-8">
            <h2 className="p-1">Discover</h2>
            <div className="w-4/6 flex justify-end p-1">
              <input
                name="search"
                onChange={handlesearch}
                className="w-full bg-slate-300 rounded-s-md"
              />
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
          {/* add cohort project and student button */}
          {isadmin ? (
            <>
              {" "}
              <Link to="/addcohort">
                {" "}
                <button className="float-right bg-blue-400 mt-8  ml-1 rounded-md p-1 text-sm ">
                  Add Cohort
                </button>
              </Link>
              <Link to="/addstudent">
                {" "}
                <button className="float-right bg-blue-400 mt-8   rounded-md p-1 text-sm ">
                  Add Student
                </button>
              </Link>{" "}
            </>
          ) : isstudent ? (
            <Link to="/addproject">
              <button className="float-right bg-blue-600 mt-8   rounded-md p-1 text-sm ">
                Add project
              </button>
            </Link>
          ) : null}

          {isrequest ? (
            <h1 className="sm:w-3/4 ml-auto text-center mt-8  ">Requests</h1>
          ) : (
            <h1 className=" sm:w-3/4 ml-auto text-center mt-8 ">Projects</h1>
          )}

          {/* card section */}
          {isrequest && request ? (
            <Requests request={request} user={user} refresh={refresh} setRefresh={setRefresh} />
          ) : issearch && search ? (
            <div className=" w-full sm:w-3/4 sm:ml-auto h-full mt-8 grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 text-center ">
              {search.map((data) => (
                <Link to={`/project/${data.id}`}>
                  <div className="w-full bg-slate-300 h-32 rounded-md pt-3">
                    {" "}
                    <h3 className=" text-black  ">{data.name}</h3>
                    <p className="text-sm text-slate-600">{data.description}</p>
                    <p className="text-sm text-slate-600"> {data.githublink}</p>
                    {isadmin ? (
                      <button className="float-right bg-red-400 mr-4 rounded-md p-1 text-sm ">
                        Delete
                      </button>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Projects
              projects={projects}
              isstudent={isstudent}
              isadmin={isadmin}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
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

export default Home;
