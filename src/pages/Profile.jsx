import { useEffect, useState } from "react"
import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { InputDiv } from "../component/InputDiv"
import http from "../lib/http"

// icons
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
    const [pictureFile, setPictureFile] = useState(null)

    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    // ================= FETCH PROFILE =================
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await http("/admin/users/profile")

                if (!res.success) {
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


                setPicture(
                    data.picture
                        ? `https://hilal-backend.camps.fahrul.id/${data.picture}`
                        : "https://images.pexels.com/photos/32703420/pexels-photo-32703420.jpeg"
                )

            } catch (err) {
                console.log(err)
            }
        }

        fetchProfile()
    }, [])

    // ================= PREVIEW IMAGE =================
    useEffect(() => {
        if (pictureFile) {
            const preview = URL.createObjectURL(pictureFile)
            setPicture(preview)
        }
    }, [pictureFile])

    // ================= HANDLE INPUT =================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        })
    }

    // ================= UPDATE PROFILE =================
    const handleSubmit = async () => {
        try {
            const body = {
                fullname: form.fullname,
                email: form.email,
                phone: form.phone,
                address: form.address
            }

            if (form.password) {
                body.password = form.password
            }

            const res = await http("/admin/users/profile", {
                method: "PATCH",
                body: body
            })

            if (!res.success) {
                alert(res.message)
                return
            }

            alert("Update success")

        } catch (err) {
            console.log(err)
        }
    }

    // ================= CHANGE PASSWORD =================
    const handleChangePassword = async () => {
        try {
            const res = await http("/admin/users/profile/password", {
                method: "PATCH",
                body: passwordForm
            })

            if (!res.success) {
                alert(res.message)
                return
            }

            alert("Password change successfully")

            setPasswordForm({
                old_password: "",
                new_password: ""
            })

        } catch (err) {
            console.log(err)
        }
    }

    // ================= UPLOAD PHOTO =================
    const handleUploadPhoto = async () => {
        if (!pictureFile) {
            alert("Please select image")
            return
        }

        if (!pictureFile.type.startsWith("image/")) {
            alert("File must be image")
            return
        }

        if (pictureFile.size > 2 * 1024 * 1024) {
            alert("Max size 2MB")
            return
        }

        const formData = new FormData()
        formData.append("picture", pictureFile)

        try {
            const token = localStorage.getItem("token")

            const res = await fetch(
                "https://hilal-backend.camps.fahrul.id/admin/users/profile/photo",
                {
                    method: "PATCH",
                    headers: {
                        Authorization: "Bearer " + token
                    },
                    body: formData
                }
            )

            const data = await res.json()

            if (!data.success) {
                alert(data.message)
                return
            }

            alert("Upload success")

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <NavDiv />
            <div className="mx-20 my-10">
                <h1 className="text-3xl py-5">Profile</h1>
                <div className="flex gap-3">

                    {/* ================= SIDEBAR ================= */}
                    <aside className="w-1/5 flex flex-col justify-between items-center border border-[#E8E8E8] h-70 px-2 py-3">
                        <div className="flex flex-col items-center">
                            <h2>{form.fullname}</h2>
                            <p>{form.email}</p>
                        </div>

                        <div className="flex flex-col items-center w-full">
                            <img
                                src={picture}
                                alt="profile"
                                className="w-40 h-40 mb-3 object-cover rounded-full"
                            />

                            {/* INPUT FILE */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPictureFile(e.target.files[0])}
                                className="hidden"
                                id="upload"
                            />

                            <label
                                htmlFor="upload"
                                className="bg-[#FF8906] w-full py-2 rounded cursor-pointer text-center"
                            >
                                Upload New Photo
                            </label>

                            <button
                                onClick={handleUploadPhoto}
                                className="bg-black text-white w-full py-2 rounded mt-2"
                            >
                                Save Photo
                            </button>

                            <p>Since <span className="font-bold">20 January 2022</span></p>
                        </div>
                    </aside>

                    {/* ================= FORM ================= */}
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
                            type={showOldPassword ? "text" : "password"}
                            name="old_password"
                            value={passwordForm.old_password}
                            onChange={handlePasswordChange}
                            icon={<GoKey />}
                            eye={<FiEye className="cursor-pointer" onClick={() => { setShowOldPassword(prev => !prev) }}  />}
                        >
                            Old Password
                        </InputDiv>

                        <InputDiv
                            type={showNewPassword ? "text" : "password"}
                            name="new_password"
                            value={passwordForm.new_password}
                            onChange={handlePasswordChange}
                            icon={<GoKey />}
                            eye={<FiEye className="cursor-pointer" onClick={() => { setShowNewPassword(prev => !prev) }}  />}
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
            <Footer />
        </div>
    )
}