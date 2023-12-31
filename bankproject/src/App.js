import React, { useEffect, useState } from "react";
import "./index.css";
import Login from "./Login";
import Studentlogin from "./Studentlogin";
import Home from "./Home";
import Adminhome from "./Adminhome";
import Addstudent from "./Addstudent";
import { Route, Routes } from "react-router-dom";
import Project from "./Project";
import Addproject from "./Addproject";
import Addcohort from "./Addcohort";
import Requestproj from "./Requestproj";
import Cohorts from "./Cohorts";
import Singlecohort from "./Singlecohort";

function App() {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [request, setRequest] = useState([]);
  const [isloggedin, setIsloggedin] = useState(false);
  const [isadmin, setIsadmin] = useState(false);
  const [isstudent, setIsstudent] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [cohort, setCohort] = useState([]);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/session")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       if (data!=null){
  //         setUser(data)
  //         // setIsloggedin(true)
  //       }
  //       else if (data==null){
  //         setUser(null)
  //         setIsloggedin(false)
  //       }
  //     });
  // }, [isloggedin]);
  // console.log(user)

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
  }, [refresh]);
  // console.log(projects);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/request")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setRequest(data);
      });
  }, [refresh]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/cohort")
      .then((res) => res.json())
      .then((data) => {
        setCohort(data);
      });
  }, [refresh]);

  return (
    <div className="text-black-500">
      {/* <Login /> */}
      {/* < Studentlogin /> */}
      {/* <Home /> */}
      {/* <Adminhome /> */}
      {/* <Addstudent /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              projects={projects}
              isloggedin={isloggedin}
              user={user}
              setIsloggedin={setIsloggedin}
              setUser={setUser}
              isstudent={isstudent}
              isadmin={isadmin}
              setIsadmin={setIsadmin}
              setIsstudent={setIsstudent}
              request={request}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          }
        />
        <Route
          path="/adminlogin"
          element={
            <Login
              user={user}
              isloggedin={isloggedin}
              setIsloggedin={setIsloggedin}
              setUser={setUser}
              setIsstudent={setIsstudent}
              setIsadmin={setIsadmin}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          }
        />
        <Route
          path="/studentlogin"
          element={
            <Studentlogin
              setisloggedin={setIsloggedin}
              user={user}
              setUser={setUser}
              setIsstudent={setIsstudent}
              setIsadmin={setIsadmin}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          }
        />
        <Route
          path="/project/:id"
          element={
            <Project
              isadmin={isadmin}
              isstudent={isstudent}
              refresh={refresh}
            />
          }
        />
        <Route
          path="/adminhome"
          element={
            <Adminhome
              projects={projects}
              isstudent={isstudent}
              isadmin={isadmin}
            />
          }
        />
        <Route
          path="/addproject"
          element={
            <Addproject user={user} setRefresh={setRefresh} refresh={refresh} />
          }
        />
        <Route
          path="/addstudent"
          element={<Addstudent setRefresh={setRefresh} refresh={refresh} />}
        />
        <Route path="/addcohort" element={<Addcohort user={user} />} />
        <Route
          path="/cohort"
          element={
            <Cohorts isstudent={isstudent} isadmin={isadmin} cohort={cohort} />
          }
        />
        <Route
          path="/request/:id"
          element={
            <Requestproj
              user={user}
              isadmin={isadmin}
              isstudent={isstudent}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          }
        />
        <Route
          path="/cohort/:id"
          element={
            <Singlecohort
              isstudent={isstudent}
              isadmin={isadmin}
              cohort={cohort}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
