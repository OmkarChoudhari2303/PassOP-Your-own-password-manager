import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef(); //useRef is used for giving referance , where we are giving there we have to mention ref={var_name in which useRef is declared}
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

const getPasswords = async ()=>{
  let req = await fetch("http://localhost:3000/");
  let passwords = await req.json();
      //here we have written the logic that if the localstorage has the password then we'll load the password and populate the password array.
  setPasswordArray(passwords);
  console.log(passwords);
}
  useEffect(() => {
    getPasswords();
    //useEffect is a React Hook that enables functional components to perform side effects. These effects can include tasks like data fetching, setting up subscriptions, or manually altering the DOM, all of which interact with systems outside of React's state and props.
    
  }, []);

  const showPassword = () => {
    // alert("Show the Password");
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = async () => {
    // if length of the content to be filled is greated than 3 characters then only password will be saved else it wont be saved
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      // if any such id exist in the database delete it
       await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id: form.id})})

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]); //in this ...passwordArray means spreading the array andd then we are inserting the password into it.
      await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
              body:JSON.stringify({...form,id: uuidv4() })})

      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // ); // json.stringify converts the input into the json format.
      // console.log([...passwordArray, form]);

      setForm({ site: "", username: "", password: "" })
        toast("Password Saved Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{
       toast("Password Not Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword =async (id) => {
    let c = confirm("Do you really want to delete This??");
    if (c) {
      console.log("Deleting Password with id: ", id);
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // ); // json.stringify converts the input into the json format.

      let res = await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id})})

    }
    toast("Password Deleted Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const editPassword = (id) => {
    console.log("Editing Password with id: ", id);
    setForm({...passwordArray.filter((i) => i.id === id)[0],id:id});
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // the value given in the input box will be filled in form in name:value format.
  };

  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-3 md:p-0 md:mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>

          <span>Pass</span>
          <span className="text-green-500">OP&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-3 items-center">
          <input
            value={form.site} // gives website to form.
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full text-black p-4 py-1 hover:bg-green-200"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-3">
            <input
              value={form.username} //gives username to form.
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full text-black p-4 py-1 hover:bg-green-200"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password} // give value to form.
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full text-black p-4 py-1 hover:bg-green-200"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  width={26}
                  className="p-1"
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center gap-2 items-center rounded-full hover:border hover:shadow-md shadow-green-900 border-green-600 bg-green-400 px-8 py-2 w-fit hover:bg-green-300"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold py-4 text-2xl">Your Password</h2>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}
          {/* {this works as if else before && its if part and afet && else part} */}
          {passwordArray.length != 0 && (
            <table className="table-auto line w-full rounded-md overflow-hidden mb-10">
              {/* here table has two types table-auto(where column size is flexible according to content) and table-fixed(where column size is fixed) */}
              {/* if overflow-hidden is applied then only we can modify the table */}
              <thead className=" border-black bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 rounded-lg">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border  border-white text-center">
                        <div
                          className=" flex justify-center items-center "
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <a href={item.site} target="_blank">
                            <span>{item.site}</span>
                          </a>
                          <div className="size-7 pt-1.5 pl-1.5 cursor-pointer">
                            <img
                              className=" w-4 "
                              src="/icons/copy button.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div
                          className="flex justify-center items-center "
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <span>{item.username}</span>
                          <div className="size-7 pt-1.5 pl-1.5 cursor-pointer">
                            <img
                              className=" w-4 "
                              src="/icons/copy button.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div
                          className="flex justify-center items-center "
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <span>{"*".repeat(item.password.length)}</span>
                          <div className="size-7 pt-1.5 pl-1.5 cursor-pointer">
                            <img
                              className=" w-4 "
                              src="/icons/copy button.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/fikcyfpp.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
