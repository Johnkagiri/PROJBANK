import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";

function Requests({ request, user, setRefresh, refresh }) {
  const adminids = [];
  const navigate = useNavigate();

  user.cohort.map((data) => {
    adminids.push(data.id);
  });

  // console.log(request);

  const filterreq = request.filter(
    (data) => adminids.includes(data.student.cohort.id)
    // console.log(data)
  );
  console.log(filterreq);

  function handleDecline(id) {
    fetch(`http://127.0.0.1:8000/request/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status == 200) {
        console.log("deleted");
        setRefresh(!refresh);
      }
    });
  }
  function handleAccept(request, id) {
    const values = {
      name: request.name,
      description: request.description,
      githublink: request.githublink,
      languages: request.languages,
      studentId: request.student_id,
      image: request.image
    };
    fetch("http://127.0.0.1:8000/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("project added by admin");
        console.log(data);
        fetch(`http://127.0.0.1:8000/request/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setRefresh(!refresh);
            navigate("/");
            enqueueSnackbar(data.message, { variant: "success" });
          });
      });
  }

  return (
    <div className=" w-full sm:w-3/4 sm:ml-auto h-full mt-20 grid grid-cols-1 gap-4 p-1 sm:grid-cols-3 text-center ">
      {filterreq.length ? (
        filterreq.map((requests) => (
          <div
            className="w-full bg-slate-300 h-72 rounded-md pt-3"
            key={requests.id}
          >
            <img
              className=" m-auto sm:w-full sm:h-32 px-2 rounded-md "
              src={requests.image}
              alt="project"
            />
            <Link to={`/request/${requests.id}`}>
              {" "}
              <h3 className=" text-blue-500  ">{requests.name}</h3>
            </Link>
            <p className="text-sm text-slate-600">{requests.description}</p>
            <p className="text-sm text-slate-600"> {requests.githublink}</p>
            <div className="   ">
              <button
                onClick={() => handleDecline(requests.id)}
                className="float-right bg-red-400 mr-4 rounded-md p-1 text-sm "
              >
                Decline
              </button>
              <button
                onClick={() => handleAccept(requests, requests.id)}
                className="float-right bg-blue-400 mr-4 rounded-md p-1 text-sm "
              >
                Accept
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No requests available</p>
      )}
    </div>
  );
}

export default Requests;
