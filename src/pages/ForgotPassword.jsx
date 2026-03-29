import { InputDiv } from "../component/InputDiv";
import { MainDiv } from "../component/MainDiv";
import { HiOutlineMail } from "react-icons/hi";
import { ButtonDiv } from "../component/ButtonDiv";
import forgotPassImage from "/assets/img/Rectangle289-2.png";
import { useForm } from "react-hook-form";
import http from "../lib/http.js";
import { useNavigate } from "react-router-dom";

export const ForgotPass = () => {
    const { 
        handleSubmit, 
        register, 
        formState: { isSubmitting } 
    } = useForm()
    
    const navigate = useNavigate()

    async function onRequestForgot(value) {
        try {
            const response = await http("/auth/forgot-password", {
                method: "POST",
                body: {
                    email: value.email
                }
            })

            if (response.success) {
                alert("Request Success! Please check your email for the reset code")
                navigate("/reset-password", { state: { email: value.email } })
            } else {
                alert(response.message || "Email not found")
            }
        } catch (error) {
            console.error("Forgot Password Error:", error)
            alert("Connection server error")
        }
    }

    return (
        <form onSubmit={handleSubmit(onRequestForgot)}>
            <MainDiv 
                img={forgotPassImage} 
                imgname={"main-image"} 
                title={"Forgot Password"} 
                desctitle={"We will send instructions to your email"}
            >
                <InputDiv 
                    register={register} 
                    type={"email"} 
                    id={"email"} 
                    name={"email"} 
                    icon={<HiOutlineMail />} 
                    placeholder={"Enter Your Email"}
                >
                    Email
                </InputDiv>

                <ButtonDiv type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit"}
                </ButtonDiv>
            </MainDiv>
        </form>
    )
}