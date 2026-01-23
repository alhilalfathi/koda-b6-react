import { InputDiv } from "../component/InputDiv";
import { MainDiv } from "../component/MainDiv";
import { HiOutlineMail } from "react-icons/hi";
import { ButtonDiv } from "../component/buttonDiv";


export const ForgotPass = ()=>{
    return(
        <MainDiv img={"src/assets/img/Rectangle289-2.png"} imgname={"main-image"} title={"Fill out the form correctly"} desctitle={"We will send new password to your email"}>
            <InputDiv type={"email"} id={"email"} name={"email"} icon={<HiOutlineMail />} placeholder={"Enter Your Email"}>Email</InputDiv>
            <ButtonDiv>Submit</ButtonDiv>        
        </MainDiv>
    )
}