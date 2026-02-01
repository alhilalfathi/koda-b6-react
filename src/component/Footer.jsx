import logo from "../assets/img/Frame12.png"
import sosmed from "../assets/img/Frame42.png"

export const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row px-20 py-10 gap-40 bg-[#F8F8F8]">
        <div className="w-78 flex flex-col gap-4 justify-center" >
            <img src={logo} alt="logo coffee shop"/>
            <p>Coffee Shop is a store that sells some good meals, and especially coffee. We provide high quality beans</p>
            <p className="text-zinc-400 py-10">@2020CoffeeStore</p>
        </div>
        <ul className="flex flex-col gap-4">
            <li className="font-bold">Product</li>
            <li>Our Product</li>
            <li>Pricing</li>
            <li>Locations</li>
            <li>Countries</li>
            <li>Blog</li>
        </ul>
        <ul className="flex flex-col gap-4">
            <li className="font-bold">Engage</li>
            <li>Partner</li>
            <li>FAQ</li>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
        </ul>
        <div className="flex gap-4 flex-col">
            <p className="pl-4 font-bold">Social Media</p>
            <img className="w-30 md:w-unset" src={sosmed} alt="sosmed"/>
        </div>
    </div>
  )
}
