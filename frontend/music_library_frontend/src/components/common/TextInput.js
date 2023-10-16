const TextInput=({lable,placeholder,type,className,value,setValue})=>{
    return(
        <div className={`textInput flex flex-col space-y-2 w-full ${className}`}>
            <lable for={lable} className="font-semibold">{lable}</lable>
            <input 
            className="p-1 text-black border border-gray-500 border-solid rounded placeholder-gray-500"
            id={lable}
            type={type} 
            placeholder={placeholder}
            value={value}
            onChange={(e)=>{
                setValue(e.target.value);
            }}
            />
        </div>
    )
}
export default TextInput;