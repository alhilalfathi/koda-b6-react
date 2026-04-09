export const InputDiv = (input)=>{
    const isHookForm = !!input.register

    return(
        <div className="flex flex-col">
            <label htmlFor={input.id} className="font-bold my-2 text-lg">
                {input.children}
            </label>

            <div className="flex items-center bg-stone-50 border-2 border-stone-200 h-10 px-3 rounded-lg">
                {input.icon}

                <input 
                    className="mx-4 w-full px-3 py-2" 
                    type={input.type} 
                    id={input.id} 
                    name={input.name}
                    placeholder={input.placeholder}

                    {...(isHookForm ? input.register(input.name) : {})}

                    {...(!isHookForm ? {
                        value: input.value || "",
                        onChange: input.onChange
                    } : {})}
                />

                {input.eye}
            </div>
        </div>
    )
}