import React from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from 'react';
import EmojiBackground from './Emojis'; // <-- Import the emoji background
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Navbar = () => {
  const [form, setform] = useState(()=>{
    const savedfrom = localStorage.getItem("formInput");
    return savedfrom ? JSON.parse(savedfrom) : { site: "", username: "", password: "" };
  })
  const [showPassword, setshowPassword] = useState(false)
  const [passwords, setpasswords] = useState([]) //to store the passwords 


  const HandleShowPassword = () => {
    setshowPassword((prev) => !prev) //to toggle the show password state
  }

  useEffect(() => {
    localStorage.setItem("formInput", JSON.stringify(form)); //to save the form input in the local storage 
  }, [form])
  
  const handleform = (e) => {  //to handle the form input changes
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }))  //to set the form state based on the input name and value and this is used to handle the form input changes like site have site name, username have username and passeword have password 
  }

  useEffect(() => {  //to get the passwords form local storage when the password is already saved 
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswords(JSON.parse(passwords));  //here parse is used to convert the string to object
    }
  }, [])


  const savePassword = (e) => {
    e.preventDefault();
    if (!form.site || !form.username || !form.password) return alert("Please fill all the fields");
    setpasswords([...passwords, { ...form, id: uuidv4() }]); //here we are spreading the previous passowrds and adding the data which is in the form state
    toast.success('Password Added successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    setform({ site: "", username: "", password: "" }); // to reset the form after saving the password
    localStorage.removeItem("formInput"); //to remove the form input form the local storage after saving the password
    
    localStorage.setItem("passwords", JSON.stringify([...passwords, { ...form, id: uuidv4() }]))
     //to save the passwords in the local storage
    // here we are saving the passwords in the local storage by converting the object to string using JSON.stringify
    // and we are also adding a unique id to each password using uuidv4() function
  }

  const copyText = (text) => {
    toast('🦄Copy TO ClipBoard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    navigator.clipboard.writeText(text);// to copy the text to clipboard
  }

  const deletePass = (id) => {
    console.log("Deleting password with id:", id);
    let c = confirm("Are you sure you want to delete this passwords?");
    if (c) {
      const updatedPasswords = passwords.filter((item) => item.id !== id); // to filter out the passwords means it will return the passwords which are not equal to the id of the password we want to delete
      setpasswords(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));// update the local storage with the new passwords array
      toast.error('Password Deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  }

  const editPass = (id) => {
    const passwordsTOedit = passwords.find((item) => item.id === id);//find the password we want to edit based on the id 
    if (passwordsTOedit) {
      setform({   //here we are setting the form state to the password we want to edit 
        site: passwordsTOedit.site,
        username: passwordsTOedit.username,
        password: passwordsTOedit.password
      })
      setpasswords(passwords.filter((item) => item.id !== id));
    }
  }


  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="relative min-h-screen overflow-hidden">
        <EmojiBackground /> {/* Emoji background behind everything */}
        {/* Navbar */}
        <div className='relative z-1'>
          <div className="flex justify-around items-center bg-gradient-to-r from-green-500 via-gray-300 to-green-400 py-2 px-8 shadow-lg">
            <h1 className="text-white font-bold tracking-widest text-3xl drop-shadow-lg animate-fade-in-down">
              Pass<span className="text-green-300">Op</span>
            </h1>
            <span className='flex gap-3 items-center text-xl font-bold text-white bg-green-600  border-2 rounded-4xl  border-white px-2 py-1 '>
              <i class="text-4xl fa-brands fa-github"></i><h1>Github</h1>
            </span>
            
          </div>

          {/* Hero / Form Section */}
          <div className="flex flex-col items-center justify-center min-h-[350px] w-full sm:w-[60%] md:w-[70%] m-auto bg-white/80 rounded-3xl shadow-2xl p-8 mt-8 animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="font-bold text-2xl md:text-3xl mb-1">
                Pass<span className="text-green-800">OP</span>
              </div>
              <h2 className="text-lg md:text-xl text-gray-500 font-medium">Your Password Manager</h2>
            </div>
            <form className="flex flex-col gap-6 w-full items-center">
              <input
                onChange={handleform}
                value={form.site}  //the value of the input is set to the form.site which is the site name
                className="border border-green-400 rounded-2xl w-full p-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 shadow-sm"
                type="text"
                placeholder="Website / App Name"
                name='site'

              />
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  onChange={handleform}
                  value={form.username} //
                  className="border border-green-400 rounded-2xl w-full p-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 shadow-sm"
                  type="text"
                  placeholder="Username / Email"
                  name='username'
                />
                <div className='relative'>
                  <input
                    onChange={handleform}
                    value={form.password}
                    className=" relative border border-green-400 rounded-2xl w-full p-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 shadow-sm"
                    type={showPassword ? "text" : "password"} //to toggle the password visibility based on the showPassword state
                    placeholder="Enter Password"
                    name='password'
                  />
                  <span onClick={HandleShowPassword} className='absolute top-5 right-3 '>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              <button
                onClick={savePassword}
                type="submit"
                className=" border-1 border-black bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full w-fit px-3 py-2 md:px-8 md:py-3 mt-2 font-semibold md:text-lg shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-800 transition-all duration-100"
              >
                <span className="inline-block animate-pulse mr-2">+</span>
                Add Password
              </button>
            </form>
          </div>

          {/*password list  */}
          <div className='flex flex-col gap-4 m-auto mt-4 w-full sm:w-[60%] md:w-[70%] '>
            <h1 className='font-bold text-xl text-lime-600 text-center'>YOURS PASSWORDS</h1>
            {passwords.length === 0 ? (  //if the passwords array is empty then show this message 
              <div className="text-center text-gray-500 my-4">No passwords saved yet</div>
            ) : (  //otherwise show the passwords in a table 
              <table className="w-full table-auto m-auto rounded-md overflow-hidden">
                <thead className="bg-green-600 text-white border-t border-green-600 ">
                  <tr>
                    <th className="text-center p-2">Website</th>
                    <th className="text-center p-2">Username</th>
                    <th className="text-center p-2">Password</th>
                    <th className="text-center p-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100">
                  {passwords.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className=" flex text-center p-2 justify-center items-center gap-2">
                        {item.site}
                        <span onClick={() => { copyText(item.site) }}><i class="fa-solid fa-copy"></i></span>
                      </td>
                      <td className="text-center p-2">
                        {item.username}
                        <span onClick={() => { copyText(item.username) }} className='ml-2'><i class="fa-solid fa-copy"></i></span>
                      </td>
                      <td className="text-center p-2">
                        {item.password}
                        <span onClick={() => { copyText(item.password) }} className='ml-2'><i class="fa-solid fa-copy"></i></span>
                      </td>
                      <td className="text-center p-2">
                        <i onClick={() => { editPass(item.id) }} class=" mr-4 fa-solid fa-pen-to-square"></i> {/*here we are sending the id of the password to the editPass function to delete that particular password*/}
                        <i onClick={() => { deletePass(item.id) }} class="fa-solid fa-trash"></i> {/*same as above to delete the password*/}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>

  )
}

export default Navbar