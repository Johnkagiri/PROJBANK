import React, { useState } from "react";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";

function Menu({ isadmin, isstudent, isrequest, setIsrequest }) {
  const [click, setClick] = useState(false);
  const navigate = useNavigate()

  // console.log(projects);
  const sidemenu = classNames(
    " w-1/2 sm:w-1/4 h-screen  bg-slate-700 fixed top-0 z-10 sm:left-0 rounded-e-md text-center ",
    {
      "left-0": click,
      "left-[-400px]": !click,
    }
  );

  function handlerequest() {
    setIsrequest(true);
    navigate('/')
  }

  function handleproject(){
    setIsrequest(false)
    navigate('/')
  }

  return (
    <div className={sidemenu}>
      <div className="w-24 bg-slate-400 m-auto mt-10 rounded-lg h-10 p-2 ">
        <h2>LOGO</h2>
      </div>
      {isadmin ? (
        <div className="mt-20 text-white text-center ">
          <h4 className="mt-3">Discover</h4>
          <h4 onClick={handleproject} className="mt-3"><Link to="/">Projects</Link></h4>
          <Link to='/cohort' ><h4 className="mt-3">Cohort</h4></Link>
          <h4 className="mt-3">People</h4>
          <h4 className="mt-3">Languages</h4>
          
            <h4 onClick={handlerequest} className="mt-3">
             Requests
            </h4>
          
        </div>
      ) : isstudent ? (
        <div className="mt-20 text-white text-center ">
          <h4 className="mt-3">Discover</h4>
          <h4 className="mt-3">Projects</h4>
          <Link to='/cohort' ><h4 className="mt-3">Cohort</h4></Link>
          <h4 className="mt-3">Languages</h4>
        </div>
      ) : (
        <div className="mt-20 text-white text-center ">
          <h4 className="mt-3">Discover</h4>
          <h4 className="mt-3">Projects</h4>
          <h4 className="mt-3">About</h4>
        </div>
      )}
    </div>
  );
}

export default Menu;
