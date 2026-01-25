export const MainDiv = (main)=>{

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* side image */}
            <div className="hidden md:block md:w-1/3">
                <img className="h-64 md:h-full w-full" src={main.img} alt={main.imgname} />
            </div>
            {/* content */}
            <div className="w-full px-6 md:w-2/3 md:mx-40 py-8 flex flex-col gap-4">
                <img className="w-74 my-10" src="src/assets/img/Frame12.png" alt="logo" />
                <div className="flex flex-col gap-4">
                    <h1 className="text-orange-900 font-bold text-2xl">{main.title}</h1>
                    <p>{main.desctitle}</p>
                    {main.children}
                </div>
            </div>
            
        </div>
    )
}