import { InputDiv } from "../component/InputDiv";
import { MainDiv } from "../component/MainDiv";
import { GoKey, GoShieldCheck } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import { ButtonDiv } from "../component/ButtonDiv";
import resetPassImage from "/assets/img/Rectangle289-2.png";
import { useForm } from "react-hook-form";
import http from "../lib/http.js";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const registerSchema = yup.object({
    password: yup.string().required("Password must be filled").min(8, "Password minimum 8 characters")
})

export const ResetPassword = () => {
    const { 
        handleSubmit, 
        register, 
        formState: { isSubmitting } 
    } = useForm({ resolver: yupResolver(registerSchema) })

    const [changePassword, setChangePassword] = useState(true)
    const changeIcon = changePassword === true ? false : true
    
    const navigate = useNavigate()
    const location = useLocation()

    const emailFromForgot = location.state?.email || ""
    console.log(emailFromForgot)

    async function onResetPassword(value) {
        try {
            const response = await http("/auth/forgot-password", {
                method: "PATCH",
                body: {
                    email: emailFromForgot,
                    code: parseInt(value.code),
                    password: value.password
                }
            })

            if (response.success) {
                alert("Password successfully updated! Please login with your new password")
                navigate("/login")
            } else {
                alert(response.message || "Invalid code or email")
            }
        } catch (error) {
            console.error("Reset Password Error:", error)
            alert("Connection server error")
        }
    }

    return (
        <form onSubmit={handleSubmit(onResetPassword)}>
            <MainDiv 
                img={resetPassImage} 
                imgname={"main-image"} 
                title={"Reset Password"} 
                desctitle={`Updating password for: ${emailFromForgot}`}
            >
                {/* Input code OTP */}
                <InputDiv 
                    register={register} 
                    type={"number"} 
                    id={"code"} 
                    name={"code"} 
                    icon={<GoShieldCheck />} 
                    placeholder={"Enter 5-digit code"}
                >
                    Reset Code
                </InputDiv>

                {/* Input New Password */}
                <InputDiv 
                    register={register} 
                    type={changePassword ? "password" : "text"}
                    id={"password"} 
                    name={"password"} 
                    icon={<GoKey />} 
                    placeholder={"Enter New Password"}
                    eye={<FiEye className="cursor-pointer" onClick={() => { setChangePassword(changeIcon) }} />}
                >
                    New Password
                </InputDiv>

                <ButtonDiv type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update Password"}
                </ButtonDiv>
            </MainDiv>
        </form>
    )
}