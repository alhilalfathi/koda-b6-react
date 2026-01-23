import { InputDiv } from "../component/InputDiv";
import { MainDiv } from "../component/MainDiv";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { ButtonDiv } from "../component/buttonDiv";
import { LoginByDiv } from "../component/LoginByDiv";


export const RegisterPage = ()=>{

    return (
        <MainDiv img={"src/assets/img/Rectangle289.png"} imgname={"main-image"} title={"Register"} desctitle={"Fill out the form correctly"}>
            <InputDiv type={"text"} id={"name"} name={"name"} icon={<IoPersonOutline />} placeholder={"Enter Your Full Name"}>Full Name</InputDiv>
            <InputDiv type={"email"} id={"email"} name={"email"} icon={<HiOutlineMail />} placeholder={"Enter Your Email"}>Email</InputDiv>
            <InputDiv type={"password"} id={"password"} name={"password"} icon={<GoKey />} placeholder={"Enter Your Password"}>Password</InputDiv>
            <InputDiv type={"password"} id={"confirmPassword"} name={"confirmPassword"} icon={<GoKey />} placeholder={"Enter Your Password Again"}>Confirm Password</InputDiv>
            <ButtonDiv>Register</ButtonDiv>
            <LoginByDiv />
        </MainDiv>
    )
}