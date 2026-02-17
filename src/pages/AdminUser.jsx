import { IoCloseCircleSharp } from "react-icons/io5"
import filterIcon from "/assets/img/Filter3.png"
import deleteIcon from "/assets/img/Group-1706.png"
import editIcon from "/assets/img/Group-1707.png"
import addIcon from "/assets/img/plus.png"
import userProfilePics1 from "/assets/img/user1.png"
import userProfilePics2 from "/assets/img/user2.png"
import { InputDiv } from "../component/InputDiv"
import { IoPersonOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi"
import { GoKey, GoLocation } from "react-icons/go"
import { HiOutlineMail } from "react-icons/hi"
import { CiPhone } from "react-icons/ci"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"

export const AdminUser = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []
        setUsers(registeredUsers)
    }, [])


    const { register } = useForm()
    const insertRef = useRef()
    const showInsert = () => {
        insertRef.current.classList.remove("hidden")
    }
    const hideInsert = () => {
        insertRef.current.classList.add("hidden")
    }
    return (
        <div className="py-10 relative">
            <div className="mr-15">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold">User List</h1>
                        <button onClick={showInsert} className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
                            <img src={addIcon} alt="add icon" className="md:w-4 w-2 md:h-4 h-2" />
                            Add User
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className=" flex flex-col">
                            <label htmlFor="product-name">Search User</label>
                            <input id="product-name" type="text" placeholder="Enter User Name"
                                className="border rounded-lg pl-10 pr-4 py-2 w-64 text-sm" />
                        </div>
                        <button className="bg-orange-500 text-white mt-6 px-4 py-2 rounded-lg flex items-center gap-2">
                            <img src={filterIcon} alt="filter icon" className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-4"><input type="checkbox" /></th>
                                <th className="p-4">Image</th>
                                <th className="p-4">Full Name</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Address</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td className="p-4"><input type="checkbox" /></td>
                                    <td className="p-4">
                                        <img
                                            src={`https://placehold.co/20`}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                    </td>
                                    <td className="p-4 text-gray-500">{user.name}</td>
                                    <td className="p-4 text-gray-500">{user.phone || "-"}</td>
                                    <td className="p-4 text-gray-500">{user.address || "-"}</td>
                                    <td className="p-4 text-gray-500">{user.email}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2 justify-center">
                                            <button>
                                                <img src={editIcon} />
                                            </button>
                                            <button onClick={() => deleteUser(user.email)}>
                                                <img src={deleteIcon} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center p-4 text-sm text-gray-500">
                        <span>Show 5 user of 100 user</span>
                        <div className="flex items-center gap-2">
                            <button>Prev</button>
                            <button className="text-orange-500 font-semibold">1</button>
                            <button>2</button>
                            <button>3</button>
                            <button>4</button>
                            <button>5</button>
                            <button>6</button>
                            <button>7</button>
                            <button>8</button>
                            <button>9</button>
                            <button>Next</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* insert user sidebar  default hidden  */}
            <div ref={insertRef} className="absolute top-0 right-0 w-271 bg-black/40 min-h-screen hidden">
                <div className="absolute top-0 right-0 w-100 min-h-screen border p-5 bg-white">
                    <span className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Insert User</h1>
                        <IoCloseCircleSharp onClick={hideInsert} className="cursor-pointer" />
                    </span>
                    <label className="block text-sm mb-2">Image User</label>
                    <div className="w-12 h-12 border rounded-lg flex items-center justify-center mb-3">
                        <img src="https://placehold.co/50x50" alt="product image" className="w-6" />
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm mb-6 cursor-pointer">
                        Upload
                    </button>

                    <InputDiv register={register} type={"text"} id={"name"} name={"name"} icon={<IoPersonOutline />} placeholder={"Enter Your Full Name"}>Full Name</InputDiv>
                    <InputDiv register={register} type={"email"} id={"email"} name={"email"} icon={<HiOutlineMail />} placeholder={"Enter Your Email"}>Email</InputDiv>
                    <InputDiv register={register} type={"text"} id={"phone"} name={"phone"} icon={<CiPhone />} placeholder={"Enter Your Number"}>Phone</InputDiv>
                    <InputDiv register={register} type={"password"} id={"password"} name={"password"} icon={<GoKey />} placeholder={"Enter Your Password"} eye={<FiEye />}>Password</InputDiv>
                    <InputDiv register={register} type={"text"} id={"address"} name={"address"} icon={<GoLocation />} placeholder={"Enter Your Address"}>Address</InputDiv>

                    <label className="block my-2 font-bold">Type of User</label>
                    <div className="flex gap-2 mb-4 ">
                        <button className="border w-1/2 px-4 py-2 rounded cursor-pointer">Normal User</button>
                        <button className="border w-1/2 px-4 py-2 rounded cursor-pointer">Admin</button>
                    </div>

                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold cursor-pointer">
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    )
}
