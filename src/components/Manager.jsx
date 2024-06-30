import React, { useEffect } from 'react'

import { useRef, useState } from 'react';


// import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

//npm uuid
import { v4 as uuidv4 } from 'uuid';



export default function Manager() {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", password: "" })

    const [passwordArray, setpasswordArray] = useState([])



    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()

        console.log(passwords)

        setpasswordArray(passwords)


    }
    useEffect(() => {

        getPasswords()

        //saving at local storage
        let passwords = localStorage.getItem("passwords")

        // let passwordArray;
        // if (passwords) {
        //     setpasswordArray(JSON.parse(passwords))
        // }
    }, [])


    const copyText = (text) => {

        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
        });


        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordref.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/Crosseye.png")) {
            ref.current.src = "icons/Openeye.png"
            passwordref.current.type = "text"
        } else {
            ref.current.src = "icons/Crosseye.png"
            passwordref.current.type = "password"
        }
    }

    const savePassword = async () => {
        // if (form.site.length > 3 && form.site.username >3 && form.site.password > 3 ) {


        //if any such id exists in the db , delete it
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id:form.id}) })



        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])


        await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })


        // storing in localstorage
        // localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form])

        //want to clear form after
        setform({ site: "", username: "", password: "" })


        // let passwords = localStorage.getItem("passwords")
        // let passwordArray;
        // if(passwords){
        //     passwordArray = JSON.parse(passwords)
        // }
        // else{
        //     passwordArray = []
        // }

        toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
        });
        // }
        // else {
        //     toast("Error: Password not saved");
        // }
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id", id)

        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id }) })

            // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            // console.log(passwordArray)
            toast('Password is Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
            });

        }
        //using toastify to display password is deleted


    }

    const editPassword = (id) => {

        console.log("Editing password with id", id)
        setform({...passwordArray.filter(i => i.id == id)[0], id: id})

        setpasswordArray(passwordArray.filter(item => item.id !== id))

        // not save in local storage until usser nat click save button
        // setpasswordArray([...passwordArray,{...form, id: uuidv4()}])
        // localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
        // console.log(passwordArray)
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }







    return (
        <>


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />


            {/* background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bg-repeat bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
                </div>
            </div>


            {/* making reponsive by applying md before mycontainer*/}

            <div className='p-2 md:p-0 md: mycontainer'>
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className='text-black  flex flex-col p-4  gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Your Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className='flex flex-col  md:flex-row w-full justify-between gap-8 '>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[1px] top-[1px] cursor-pointer ' onClick={showPassword}><img ref={ref} className='p-1' width={30} src="icons/Openeye.png" alt="eye" /></span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className='passwords'>
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwordArray.length == 0 && <div> No Passwords to Show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {

                                    return <tr key={index}>
                                        <td className='flex items-center justify-center py-2 border-white text-center '> <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className=' loardiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </td>
                                        <td className=' py-2 border-white text-center '>
                                            <div className='flex items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className='loardiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border-white text-center '>
                                            <div className='flex items-center justify-center'>
                                                {/*repeat * use to hide password */}
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className='loardiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='justify-center py-2 border-white text-center '>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px" }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </span>
                                        </td>

                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}
