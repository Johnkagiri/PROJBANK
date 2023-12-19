import React, { useEffect, useState } from "react";
import { useFormik, Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";
import classNames from "classnames";

function Addproject({ user, setRefresh, refresh }) {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [languages, setLanguages] = useState("");
  const [iscollaborate, setIscollaborate] = useState(true);
  const [student, setStudent] = useState([]);
  const [issearch, setIssearch] = useState(false);
  const [search, setSearch] = useState([]);
  const [searchvalue, setSearchvalue] = useState("");
  const [matched, setMatched] = useState(false);
  //handleSubmit function, plus upload image url to database

  useEffect(() => {
    fetch("http://127.0.0.1:8000/student")
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    uploadImage();
  }

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "tracker");
    data.append("cloud_name", "john");

    fetch("https://api.cloudinary.com/v1_1/ddukojge8/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // Check if Cloudinary upload was successful and URL is obtained
        if (data.url) {
          // setUrl(data.url);

          fetch("http://127.0.0.1:8000/request", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              description: description,
              image: data.url, // Use the obtained URL from Cloudinary
              languages: languages,
              // status: 'pending',
              studentId: user.id,
            }),
          })
            .then((res) => {
              if (res.status === 200) {
                enqueueSnackbar("Record posted!", { variant: "success" });
                return res.json();
              } else {
                return res.json().then((data) => {
                  enqueueSnackbar("Record post failed", { variant: "error" });
                  console.log(data);
                });
              }
            })
            .then(() => setRefresh(!refresh))
            .catch((e) => console.log(e));
        } else {
          enqueueSnackbar("Image upload failed", { variant: "error" });
        }
      })
      .catch((err) => console.log(err));
  };

  const colllab = classNames(" fixed h-screen w-screen bg-white top-0", {
    " left-0 ": iscollaborate,
    " left-[-1400px] ": !iscollaborate,
  });
  const studentlist = classNames(" h-24 overflow-y-auto w-full bg-slate-600 ", {
    " opacity-100 ": issearch,
    " opacity-0 ": !issearch,
  });

  function handlesearch(e) {
    setSearchvalue(e.target.value);
    const lowercasequery = e.target.value.toLowerCase();

    const result = student.filter((data) =>
      data.name.toLowerCase().includes(lowercasequery)
    );
    if (e.target.value.length === 0) {
      setIssearch(false);
      setSearch([]);
      // setSearchvalue("");
    } else {
      if (result.length > 0) {
        setIssearch(true);

        setSearch(result);
        return result;
      }
      // console.log(result);
    }
  }
  function handlelistclick(name) {
    setSearchvalue(name);
    setIssearch(false);
    setMatched(true);
  }

  return (
    <div>
      <div className="h-screen p-3 ">
        <div className=" h-16 bg-slate-400 flex flex-row justify-between p-3 ">
          <Link to="/">
            {" "}
            <h1 className="  mt-2 bg-slate-300 rounded-md h-3/4 p-1 text-sm ">
              logo
            </h1>
          </Link>
          <Link to="/adminlogin">
            <button className="bg-blue-400 h-3/4  mt-2 p-1 text-sm text-white rounded-lg ">
              Login as Admin
            </button>
          </Link>
        </div>

        <div className=" flex flex-row justify-center bg-slate-300 ">
          <form
            className="flex flex-col content-center mb-1 justify-center bg-color-blue   max-w-xs w-full "
            onSubmit={handleSubmit}
          >
            <label className="m-2 text-color-tertiary font-bold">Name:</label>
            <input
              type="text"
              className="text-rich-black px-2 rounded"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="m-2 text-color-tertiary font-bold">
              Description:
            </label>
            <textarea
              className="text-rich-black px-2 rounded"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="m-2 text-color-tertiary font-bold">
              Languages:
            </label>

            <input
              type="text"
              className="text-rich-black px-2 rounded"
              onChange={(e) => setLanguages(e.target.value)}
            />
            <label className="m-2 text-color-tertiary font-bold">Image:</label>
            <input
              type="file"
              className="text-rich-black px-2 rounded"
              onChange={(e) => setImage(e.target.files[0])}
            />
            
              <button
                type="submit"
                className="text-sm bg-blue-500 my-5 mx-auto py-2  w-2/6"
              >
                ADD
              </button>
           
          </form>
        </div>
      </div>
      <div className={colllab}>
        <div>
          <input
            onChange={handlesearch}
            value={searchvalue}
            className=" bg-slate-400 "
          />{" "}
         {matched?<span className=" bg-blue-400 rounded-md ">ADD</span>:null  } 
          <div className={studentlist}>
            {search
              ? search.map((data) => (
                  <ul>
                    <li
                      className=" cursor-pointer "
                      onClick={() => {
                        handlelistclick(data.name);
                      }}
                    >
                      {" "}
                      <h1>{data.name} </h1> <p>id: {data.id}</p>{" "}
                    </li>
                  </ul>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addproject;
