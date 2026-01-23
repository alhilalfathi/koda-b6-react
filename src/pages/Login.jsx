import { MainDiv } from "../component/MainDiv";
import { InputDiv } from "../component/InputDiv";
import { HiOutlineMail } from "react-icons/hi";
import { GoKey } from "react-icons/go";
import { ButtonDiv } from "../component/buttonDiv";
import { LoginByDiv } from "../component/LoginByDiv";
import { Link } from "react-router-dom";



export const LoginPage = ()=>{
    return(
        <MainDiv img={"src/assets/img/Rectangle289-1.png"} imgname={"main-image"} title={"Login"} desctitle={"Fill out the form correctly"}>
            <InputDiv type={"email"} id={"email"} name={"email"} icon={<HiOutlineMail />} placeholder={"Enter Your Email"}>Email</InputDiv>
            <InputDiv type={"password"} id={"password"} name={"password"} icon={<GoKey />} placeholder={"Enter Your Password"}>Password</InputDiv>
            <Link className="text-orange-600 flex justify-end" to="/forgot-password">Forgot Password?</Link>
            <ButtonDiv>Login</ButtonDiv>
            <LoginByDiv />
        </MainDiv>
    )
}