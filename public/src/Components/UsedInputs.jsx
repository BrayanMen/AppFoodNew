export const Message = ({label, placeholder}) =>{
    return(
        <div className="text-sm w-full">
            <label className="text-gray-800 font-semibold">{label}</label>
            <textarea className="w-full h-40 mt-2 p-6 border border-greenP rounded"
            placeholder={placeholder}></textarea>
        </div>
    )
}

export const Select = ({label, options, onChange}) => {
    return(
        <div>
            <label className="">{label}</label>
            <select onChange={onChange} className='relative border border-primary w-full text-white bg-greenP rounded-lg cursor-default py-3 pl-6 pr-10 text-left text-xs'>
                    <option className='absolute z-10 mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                        {options}
                    </option>             
                </select>
        </div>
    )
}