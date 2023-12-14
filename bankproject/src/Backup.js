import React, { useState } from "react";
import { useFormik, Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";

function Addproject({ user, setRefresh, refresh }) {

const [name,setName]=useState('')

    const [description,setDescription]=useState('')
    const [image,setImage]=useState()
    const [languages,setLanguages]=useState('')
//handleSubmit function, plus upload image url to database


function handleSubmit(e){
  e.preventDefault()
  uploadImage() 
}

const uploadImage = () => {
  const data = new FormData()
  data.append("file", image)
  data.append("upload_preset", "tracker")
  data.append("cloud_name","john")

  fetch("https://api.cloudinary.com/v1_1/ddukojge8/image/upload", {
      method: "post",
      body: data,
  })
  .then((resp) => resp.json())
  .then((data) => {
      // Check if Cloudinary upload was successful and URL is obtained
      if (data.url) {
          // setUrl(data.url);

          fetch('http://127.0.0.1:8000/request', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
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
              if (res.status === 201) {
                  enqueueSnackbar('Record posted!', { variant: 'success' });
                  return res.json();
              } else {
                  return res.json().then((data) => {
                      enqueueSnackbar('Record post failed', { variant: 'error' });
                      console.log(data);
                  });
              }
          })
          .then(() => setRefresh(!refresh))
          .catch((e) => console.log(e));
      } else {

          enqueueSnackbar('Image upload failed', { variant: 'error' });
      }
  })
  .catch((err) => console.log(err));
}




  return (
//     <div>
    //   <div className="h-screen p-3 ">
    //     <div className=" h-16 bg-slate-400 flex flex-row justify-between p-3 ">
    //       <Link to="/">
    //         {" "}
    //         <h1 className="  mt-2 bg-slate-300 rounded-md h-3/4 p-1 text-sm ">
    //           logo
    //         </h1>
    //       </Link>
    //       <Link to="/adminlogin">
    //         <button className="bg-blue-400 h-3/4  mt-2 p-1 text-sm text-white rounded-lg ">
    //           Login as Admin
    //         </button>
    //       </Link>
    //     </div>
//         <div className="  bg-slate-200  w-2/3 sm:w-1/3 m-auto h-screen p-3 flex flex-col items-center justify-start mt-9">
//           <h3 className="">Project</h3>
//           <form onSubmit={formik.handleSubmit} className=" mt-7 ">
//             <label className="text-gray-600">Name</label>
//             <input
//               id="name"
//               name="name"
//               onChange={formik.handleChange}
//               value={formik.values.name}
//               className=" w-full bg-gray-300 text-sm text-slate-700 "
//             />
//             <label className="text-gray-600 ">Description</label>
//             <textarea
//               type="description"
//               id="description"
//               name="description"
//               onChange={formik.handleChange}
//               value={formik.values.description}
//               className=" w-full bg-gray-300 text-sm text-slate-700 "
//             />
//             <label className="text-gray-600">Githublink</label>
//             <input
//               id="githublink"
//               name="githublink"
//               onChange={formik.handleChange}
//               value={formik.values.githublink}
//               className=" w-full bg-gray-300 text-sm text-slate-700 "
//             />
//             <label className="text-gray-600">Language</label>
//             <input
//               id="languages"
//               name="languages"
//               onChange={formik.handleChange}
//               value={formik.values.languages}
//               className=" w-full bg-gray-300 text-sm text-slate-700 "
//             />
//             <label className="text-gray-600">images</label>
//             <input
//               type="file"
//               name="image"
//               onChange={(e) => {
//                 formik.setFieldValue("image", e.currentTarget.files[0]);
//               }}
//             />
//             <button
//               type="submit"
//               className="mt-3 w-full bg-blue-500 text-white "
//             >
//               ADD
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
<>
<form className='flex flex-col content-center mb-1 justify-center bg-color-blue   max-w-xs w-full' onSubmit={handleSubmit}> 
        <label className="m-2 text-color-tertiary font-bold">Name:</label>
        <input type="text" className="text-rich-black px-2 rounded" onChange={(e)=>setName(e.target.value)}/>
        <label className="m-2 text-color-tertiary font-bold">Description:</label>
        <textarea className="text-rich-black px-2 rounded"  onChange={(e)=>setDescription(e.target.value)}/>
        <label className="m-2 text-color-tertiary font-bold">Languages:</label>
        <input type="text" className="text-rich-black px-2 rounded"  onChange={(e)=>setLanguages(e.target.value)}/>
        <label className="m-2 text-color-tertiary font-bold">Image:</label>
        <input type="file" className="text-rich-black px-2 rounded"  onChange={(e)=>setImage(e.target.files[0])}/>
        <button type='submit' className='text-sm bg-color-blue2 my-5 mx-auto py-2  w-2/6' >ADD</button>
        </form>
</>
  );
}

export default Addproject;
