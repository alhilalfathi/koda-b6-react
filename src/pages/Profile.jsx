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

    useEffect(()=>{
        const fetchProfile = async () => {
            try{
                const res = await http("/admin/users/profile")

                setForm({
                    fullname: res.fullname || "",
                    email: res.email || "",
                    password: res.password || "",
                    phone: res.phone || "",
                    address: res.address || ""
                })
            }catch(err){
                console.log(err)
            }
        }

        fetchProfile()
    },[])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try{
            const body = {
                fullname: form.fullname,
                email: form.email
            }

            if(form.password){
                body.password = form.password
            }

            const res = await http("/admin/users/profile", {
                method: "PATCH",
                body: body
            })

            alert("Update success")
        }catch(err){
            console.log(err)
            alert("Update failed")
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
                        <button className="bg-[#FF8906] w-full py-2 rounded ">Upload New Photo</button>
                        <p>Since <span className="font-bold">20 January 2022</span></p>
                    </div>
                </aside>

                <div className="w-4/5 border border-[#E8E8E8] px-5 py-3">

                    <InputDiv 
                        type={"text"} 
                        id={"name"} 
                        name={"fullname"} 
                        value={form.fullname}
                        onChange={handleChange}
                        icon={<IoPersonOutline />}
                        placeholder={"Ghaluh Wizard"}
                    >
                        Full Name
                    </InputDiv>

                    <InputDiv 
                        type={"email"} 
                        id={"email"} 
                        name={"email"} 
                        value={form.email}
                        onChange={handleChange}
                        icon={<HiOutlineMail />}
                        placeholder={"ghaluhwizz@gmail.com"}
                    >
                        Email
                    </InputDiv>

                    <InputDiv 
                        type={"text"} 
                        id={"phone"} 
                        name={"phone"} 
                        value={form.phone}
                        onChange={handleChange}
                        icon={<CiPhone />}
                        placeholder={"082116304338"}
                    >
                        Phone
                    </InputDiv>

                    <InputDiv 
                        type={"password"} 
                        id={"password"} 
                        name={"password"} 
                        value={form.password}
                        onChange={handleChange}
                        icon={<GoKey />} 
                        placeholder={"********"} 
                        eye={<FiEye />}
                    >
                        Password
                    </InputDiv>

                    <InputDiv 
                        type={"text"} 
                        id={"address"} 
                        name={"address"} 
                        value={form.address}
                        onChange={handleChange}
                        icon={<GoLocation />}
                        placeholder={"Griya Bandung Indah"}
                    >
                        Address
                    </InputDiv>

                    <button 
                        onClick={handleSubmit}
                        className="bg-[#FF8906] w-full py-3 rounded my-3 font-bold"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}