import React, { useEffect, useState } from "react";
import "./index.css";
import Login from "./Login";
import Studentlogin from "./Studentlogin";
import Home from "./Home";
import Adminhome from "./Adminhome";
import Addstudent from "./Addstudent";
import { Route, Routes } from "react-router-dom";
import Project from "./Project";

function App() {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [isloggedin, setIsloggedin] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/session")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data!=null){
          setUser(data)
          setIsloggedin(true)
        }
        else if (data==null){
          setUser(null)
          setIsloggedin(false)
        }
      });
  }, [isloggedin]);
  console.log(user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/project");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(projects);
  return (
    <div className="text-black-500">
      {/* <Login /> */}
      {/* < Studentlogin /> */}
      {/* <Home /> */}
      {/* <Adminhome /> */}
      {/* <Addstudent /> */}
      <Routes>
        <Route path="/" element={<Home projects={projects} />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/studentlogin" element={<Studentlogin setisloggedin={setIsloggedin} />} />
        <Route path="/project/:id" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
