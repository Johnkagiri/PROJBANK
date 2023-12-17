import React from "react";
import { Link } from "react-router-dom";

function Projects({ projects, isadmin, isstudent, refresh, setRefresh }) {
  function handleDelete(id){
    fetch(`http://127.0.0.1:8000/project/${id}`,{
      method: 'DELETE'
    }).then(res=>{
      if(res.status==200){
        console.log('Deleted')
        setRefresh(!refresh)
      }
    })
  }

  return (
    <div className=" w-full sm:w-3/4 sm:ml-auto h-full mt-8 grid grid-cols-1 gap-4 p-1 sm:grid-cols-3 text-center ">
      {projects.length ? (
        projects.map((project) => (
          
          
            <div
              className="w-full bg-slate-300 h-72 rounded-md pt-3 mb-3"
              key={project.id}
            >
                <img
              className=" m-auto sm:w-full sm:h-32 px-2 rounded-md "
              src={project.image}
              alt="project"
            />
             <Link to={`/project/${project.id}`}> <h3 className=" text-black  ">{project.name}</h3> </Link>
              <p className="text-sm text-slate-600">{project.description}</p>
              <p className="text-sm text-slate-600"> {project.githublink}</p>
              {isadmin ? (
                <button onClick={()=>handleDelete(project.id)} className="float-right bg-red-400 mr-4 rounded-md p-1 text-sm ">
                  Delete
                </button>
              ) : null}
            </div>
         
        ))
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
}

export default Projects;
