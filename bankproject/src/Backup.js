const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const loginResponse = await fetch("http://127.0.0.1:8000/studentlogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        if (loginResponse.status === 200) {
          console.log("Login successful");
          // setisloggedin(true);
          // setRefresh(!refresh);
  
          const data = await loginResponse.json();
  
          console.log("Data:", data);
  
          // Fetch session after a successful login
          const sessionResponse = await fetch("http://127.0.0.1:8000/session");
          const sessionData = await sessionResponse.json();
  
          console.log("Session data:", sessionData);
  
          if (sessionData.session !== null) {
            // Session is not null, handle as needed
          } else {
            // Session is null, handle as needed
          }
        } else {
          console.log("Login failed");
          // Handle unsuccessful login
        }
      } catch (error) {
        console.error("Error during login:", error);
        // Handle error during login
      }
    },
  });
  