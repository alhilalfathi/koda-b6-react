import { InputDiv } from "../component/InputDiv";
import { MainDiv } from "../component/MainDiv";
import { HiOutlineMail } from "react-icons/hi";
import { ButtonDiv } from "../component/buttonDiv";
import forgotPassImage from "../assets/img/Rectangle289-2.png"

export const ForgotPass = ()=>{
    return(
        <MainDiv img={forgotPassImage} imgname={"main-image"} title={"Fill out the form correctly"} desctitle={"We will send new password to your email"}>
            <InputDiv type={"email"} id={"email"} name={"email"} icon={<HiOutlineMail />} placeholder={"Enter Your Email"}>Email</InputDiv>
            <ButtonDiv>Submit</ButtonDiv>        
        </MainDiv>
    )
}