import { useEffect, useState } from "react"
import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { InputDiv } from "../component/InputDiv"
import http from "../lib/http"

//icons
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { GoLocation } from "react-icons/go";

export const Profile = () => {

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    })

    const [passwordForm, setPasswordForm] = useState({
        old_password: "",
        new_password: ""
    })

    const [picture, setPicture] = useState("")

    useEffect(()=>{
        const fetchProfile = async () => {
            try{
                const res = await http("/admin/users/profile")

                if(!res.success){
                    alert(res.message)
                    return
                }

                const data = res.results

                setForm({
                    fullname: data.fullname || "",
                    email: data.email || "",
                    password: "",
                    phone: data.phone || "",
                    address: data.address || ""
                })

                setPicture(data.picture || "https://images.pexels.com/photos/32703420/pexels-photo-32703420.jpeg")

            }catch(err){
                console.log(err)
            }
        }

        fetchProfile()
    },[])

    //  handle input profile
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //  handle input password
    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        })
    }

    //  update profile
    const handleSubmit = async () => {
        try{
            const body = {
                fullname: form.fullname,
                email: form.email,
                phone: form.phone,
                address: form.address
            }

            if(form.password){
                body.password = form.password
            }

            const res = await http("/admin/users/profile", {
                method: "PATCH",
                body: body
            })

            if(!res.success){
                alert(res.message)
                return
            }

            alert("Update success")

        }catch(err){
            console.log(err)
        }
    }

    //  change password
    const handleChangePassword = async () => {
        try{
            const res = await http("/admin/users/profile/password", {
                method: "PATCH",
                body: passwordForm
            })

            if(!res.success){
                alert(res.message)
                return
            }

            alert("Password change successfully")

            setPasswordForm({
                old_password: "",
                new_password: ""
            })

        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <NavDiv />
        <div className="mx-20 my-10">
            <h1 className="text-3xl py-5">Profile</h1>
            <div className="flex gap-3">

                <aside className="w-1/5 flex flex-col justify-between items-center border border-[#E8E8E8] h-70 px-2 py-3">
                    <div className="flex flex-col items-center">
                        <h2>{form.fullname}</h2>
                        <p>{form.email}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={picture} alt="profile picture" className="w-40 h-40 mb-3"/>
                        <button className="bg-[#FF8906] w-full py-2 rounded cursor-pointer">
                            Upload New Photo
                        </button>
                        <p>Since <span className="font-bold">20 January 2022</span></p>
                    </div>
                </aside>

                <div className="w-4/5 border border-[#E8E8E8] px-5 py-3">

                    <InputDiv 
                        type="text"
                        name="fullname"
                        value={form.fullname}
                        onChange={handleChange}
                        icon={<IoPersonOutline />}
                    >
                        Full Name
                    </InputDiv>

                    <InputDiv 
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        icon={<HiOutlineMail />}
                    >
                        Email
                    </InputDiv>

                    <InputDiv 
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        icon={<CiPhone />}
                    >
                        Phone
                    </InputDiv>

                    <InputDiv 
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        icon={<GoKey />}
                        eye={<FiEye />}
                    >
                        Password
                    </InputDiv>

                    <InputDiv 
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        icon={<GoLocation />}
                    >
                        Address
                    </InputDiv>

                    <button 
                        onClick={handleSubmit}
                        className="bg-[#FF8906] w-full py-3 rounded my-3 font-bold"
                    >
                        Submit
                    </button>

                    <h2 className="text-xl font-bold mt-5">Change Password</h2>

                    <InputDiv
                        type="password"
                        name="old_password"
                        value={passwordForm.old_password}
                        onChange={handlePasswordChange}
                        icon={<GoKey />}
                    >
                        Old Password
                    </InputDiv>

                    <InputDiv
                        type="password"
                        name="new_password"
                        value={passwordForm.new_password}
                        onChange={handlePasswordChange}
                        icon={<GoKey />}
                    >
                        New Password
                    </InputDiv>

                    <button
                        onClick={handleChangePassword}
                        disabled={!passwordForm.old_password || !passwordForm.new_password}
                        className="bg-black text-white w-full py-2 rounded my-2 disabled:opacity-50"
                    >
                        Change Password
                    </button>

                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}