export const ButtonDiv = (btn)=>{
    return(
        <div className="bg-orange-500 rounded-lg h-12 flex justify-center items-center cursor-pointer">
            <button className="cursor-pointer font-bold text-lg" id={btn.id} type={btn.type} >{btn.children}</button>
        </div>
    )
}