import { InputDiv } from "../component/InputDiv";
import { MainDiv } from "../component/MainDiv";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { ButtonDiv } from "../component/ButtonDiv";
import { LoginByDiv } from "../component/LoginByDiv";
import { FiEye } from "react-icons/fi";
import registerImage from "/assets/img/Rectangle289.png"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useState } from "react";

const registerSchema = yup.object({
    name: yup.string().required("Name must be filled"),
    email: yup.string().required("Email must be filled").email("Email Invalid"),
    password: yup.string().required("Password must be filled").min(8, "Password minimum 8 characters"),
    confirmPassword: yup.string().required("Confirm password must be filled").oneOf([yup.ref("password")], "Password not match")
})

export const RegisterPage = () => {
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) })
    const navigate = useNavigate()

    const [changePassword, setChangePassword] = useState(true)
    const changeIcon = changePassword === true ? false : true
    const [changeConfirm, setChangeConfirm] = useState(true)
    const changeConfirmIcon = changeConfirm === true ? false : true

    function submitForm(value) {

        const role = value.email === "admin@mail.com" ? "admin" : "user"

        const dataUser = {
            name: value.name,
            email: value.email,
            password: value.password,
            role: role
        }

        const oldRegisteredUser = JSON.parse(localStorage.getItem("registeredUsers")) || []

        const isExist = oldRegisteredUser.some((user) => user.email === dataUser.email)
        if (isExist) {
            alert("Email Registered")
            return
        }

        oldRegisteredUser.push(dataUser)

        localStorage.setItem("registeredUsers", JSON.stringify(oldRegisteredUser))
        alert("Register Success")
        navigate("/login")

    }
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <MainDiv img={registerImage} imgname={"main-image"} title={"Register"} desctitle={"Fill out the form correctly"}>
                <InputDiv
                    type={"text"}
                    id={"name"}
                    name={"name"}
                    icon={<IoPersonOutline />}
                    register={register}
                    placeholder={"Enter Your Full Name"}>Full Name</InputDiv>
                <p className="text-red-500 text-sm">{errors.name?.message}</p>

                <InputDiv
                    type={"email"}
                    id={"email"}
                    name={"email"}
                    icon={<HiOutlineMail />}
                    register={register}
                    placeholder={"Enter Your Email"}>Email</InputDiv>
                <p className="text-red-500 text-sm">{errors.email?.message}</p>

                <InputDiv
                    type={changePassword ? "password" : "text"}
                    id={"password"}
                    name={"password"}
                    icon={<GoKey />}
                    register={register}
                    placeholder={"Enter Your Password"}
                    eye={<FiEye className="cursor-pointer" onClick={()=>{setChangePassword(changeIcon)}}/>}>Password</InputDiv>
                <p className="text-red-500 text-sm">{errors.password?.message}</p>

                <InputDiv
                    type={changeConfirm ? "password" : "text"}
                    id={"confirmPassword"}
                    name={"confirmPassword"}
                    icon={<GoKey />}
                    register={register}
                    placeholder={"Enter Your Password Again"}
                    eye={<FiEye className="cursor-pointer" onClick={()=>{setChangeConfirm(changeConfirmIcon)}}/>}>Confirm Password</InputDiv>
                <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>

                <ButtonDiv type="submit">Register</ButtonDiv>

                <p className="flex justify-center items-center gap-2">
                    Have an account? <Link to="/login" className="text-orange-600">Login</Link>
                </p>

                <LoginByDiv />
            </MainDiv>
        </form>
    )
}