import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { Link, useParams } from "react-router-dom";

function Singlecohort({ isadmin, isstudent, cohort, refresh, setRefresh }) {
  const [isrequest, setIsrequest] = useState(false);
  const [cohDetails, setCohDetails] = useState({});

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/cohort/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCohDetails(data);
        console.log(data);
      });
  }, [refresh]);
  // const admincohort = user.cohort.map((data)=>)

  function handledelete(sid) {
    fetch(`http://127.0.0.1:8000/student/${sid}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setRefresh(!refresh);
        console.log("Deleted succesfully");
      });
  }

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
          <div className=" text-white flex flex-row justify-center mr-2 ">
            <p className=" mr-4 text-blue-500 ">Cohort: {cohDetails.name}</p>

            <h2 className=" rounded-full bg-slate-400 w-6 h-6 text-center ">
              p
            </h2>
          </div>
        </div>

        <Menu
          isadmin={isadmin}
          isrequest={isrequest}
          isstudent={isstudent}
          setIsrequest={setIsrequest}
        />
        <div className="mt-14 sm:ml-auto sm:w-4/5  ">
          <div className=" flex flex-row justify-between p-4 ">
            <div className=" ml-6 text-sm flex flex-row  ">
              <div className="  ">
                {" "}
                <h1>
                  <span className=" text-slate-600 ">Cohort name: </span>
                </h1>
                <h1>
                  <span className=" text-slate-600 ">Start date: </span>
                </h1>
                <h1>
                  <span className=" text-slate-600 ">End date:</span>
                </h1>
              </div>
              <div className=" ml-2 ">
                <h1>{cohDetails.name}</h1>
                <h1>{cohDetails.start_date}</h1>
                <h1>{cohDetails.end_date}</h1>
              </div>
            </div>
            <div className=" text-green-600 text-sm mr-10">Active</div>
          </div>

          <div className=" w-full mt-8 pl-10 pr-4 ">
            <table className=" text-start ">
              <tr className="   ">
                <th className=" w-60 text-start h-10 ">Student Name </th>
                <th className=" w-60 text-start h-10 ">Email </th>
                <th className="w-60 text-start h-10">Projects</th>
              </tr>
              {cohDetails.student
                ? cohDetails.student.map((data) => (
                    <tr className="border-y border-slate-300 text-sm text-slate-800 ">
                      <td className=" w-60 h-16">
                        {data.name}
                        <p className=" text-sm text-slate-500 ">{data.id}</p>
                      </td>
                      <td className=" w-60 h-16">{data.email}</td>
                      <td className=" w-60 h-16">{data.project.length}</td>
                      <td className=" w-60 h-16">
                        <p
                          onClick={() => handledelete(data.id)}
                          className=" bg-red-500 w-3/4 text-center rounded-md "
                        >
                          Delete
                        </p>
                      </td>
                    </tr>
                  ))
                : null}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singlecohort;
