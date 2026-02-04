export const ButtonDiv = ({id, type, children})=>{
    return(
        <div className="bg-orange-500 rounded-lg h-12 flex justify-center items-center cursor-pointer">
            <button className="cursor-pointer font-bold text-lg" id={id} type={type} >{children}</button>
        </div>
    )
}