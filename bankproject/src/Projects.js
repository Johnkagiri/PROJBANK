import React from "react";
import { Link } from "react-router-dom";

function Projects({ projects, isadmin, isstudent }) {
  return (
    <div className=" w-full sm:w-3/4 sm:ml-auto h-full mt-8 grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 text-center ">
      {projects.length ? (
        projects.map((project) => (
          <Link to={`/project/${project.id}`}>
            {" "}
            <div
              className="w-full bg-slate-300 h-32 rounded-md pt-3"
              key={project.id}
            >
              <h3 className=" text-black  ">{project.name}</h3>
              <p className="text-sm text-slate-600">{project.description}</p>
              <p className="text-sm text-slate-600"> {project.githublink}</p>
              {isadmin ? (
                <button className="float-right bg-red-400 mr-4 rounded-md p-1 text-sm ">
                  Delete
                </button>
              ) : null}
            </div>
          </Link>
        ))
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
}

export default Projects;
