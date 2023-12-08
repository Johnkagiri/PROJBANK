import React from "react";
import { Link } from "react-router-dom";

function Requests({ request,user }) {
  
    const adminids = [];
    user.cohort.map((data) => {
      adminids.push(data.id);
      
    });

    // console.log(request)

    const filterreq= request.filter((data)=>
        adminids.includes(data.student.cohort.id)
       ) 
    console.log(filterreq);  


  return (
    <div className=" w-full sm:w-3/4 sm:ml-auto h-full mt-20 grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 text-center ">
      {filterreq.length ? (
        filterreq.map((requests) => (
          <Link to={`/request/${requests.id}`}>
            {" "}
            <div
              className="w-full bg-slate-300 h-32 rounded-md pt-3"
              key={requests.id}
            >
              <h3 className=" text-black  ">{requests.name}</h3>
              <p className="text-sm text-slate-600">{requests.description}</p>
              <p className="text-sm text-slate-600"> {requests.githublink}</p>

              <button className="float-right bg-red-400 mr-4 rounded-md p-1 text-sm ">
                Decline
              </button>
              <button
                
                className="float-right bg-blue-400 mr-4 rounded-md p-1 text-sm "
              >
                Accept
              </button>
            </div>
          </Link>
        ))
      ) : (
        <p>No requests available</p>
      )}
    </div>
  );
}

export default Requests;
