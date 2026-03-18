import { MainDiv } from "../component/MainDiv";
import { InputDiv } from "../component/InputDiv";
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { ButtonDiv } from "../component/ButtonDiv";
import { LoginByDiv } from "../component/LoginByDiv";
import { Link, useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import loginImage from "/assets/img/Rectangle289-1.png"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { login } from "../redux/reducers/authReducer";
import http from "../lib/http.js";

const loginSchema = yup.object({
    email: yup.string().required("Email must be filled").email("Email Invalid"),
    password: yup.string().required("Password must be filled").min(8, "Password min 8 characters")
})

export const LoginPage = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(loginSchema) })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [changePassword, setChangePassword] = useState(true)
    const changeIcon = changePassword === true ? false : true




    async function submitForm(value) {
        try {
            //API login
            const response = await http("/auth/login", {
                method: "POST",
                body: {
                    email: value.email,
                    password: value.password
                }
            });

            //Login check
            if (response.success || response.results) {
                const userData = response.results; // Asumsi: { token: "...", role: "...", name: "..." }

                //Save to Redux 
                dispatch(login(userData));

                //Simpan token ke localStorage
                localStorage.setItem("token", userData.token);

                alert("Login Success");

                if (userData.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                alert(response.message || "Email or Password Wrong");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Connection server error");
        }
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <MainDiv img={loginImage} imgname={"main-image"} title={"Login"} desctitle={"Fill out the form correctly"}>
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
                    eye={<FiEye className="cursor-pointer" onClick={() => { setChangePassword(changeIcon) }} />}>Password</InputDiv>
                <p className="text-red-500 text-sm">{errors.password?.message}</p>

                <Link
                    className="text-orange-600 flex justify-end"
                    to="/forgot-password">Forgot Password?</Link>

                <ButtonDiv type="submit" disabled={isSubmitting}>{isSubmitting ? "Authenticating..." : "Login"}</ButtonDiv>

                <p className="flex justify-center items-center gap-2">
                    Not have an account? <Link to="/register" className="text-orange-600">Register</Link>
                </p>

                <LoginByDiv />
            </MainDiv>
        </form>
    )
}