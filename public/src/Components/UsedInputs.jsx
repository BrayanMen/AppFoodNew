export const Message = ({ label, placeholder }) => {
    return (
        <div className="text-sm w-full">
            <label className="text-white font-semibold">{label}</label>
            <textarea className="w-full h-40 mt-2 p-6 border border-primary text-white bg-green-900 bg-opacity-50 rounded"
                placeholder={placeholder}></textarea>
        </div>
    )
}

export const Select = ({ label, options, onChange }) => {
    return (
        <div>
            <label className="font-semibold ">{label}</label>
            <select onChange={onChange} className='relative border border-primary w-full text-white bg-greenP rounded-lg cursor-default py-3 pl-6 pr-10 text-left text-xs'>
                {options.map((option, i) => (
                    (<option
                        key={i}
                        value={option.value}
                        className='absolute mt-1 max-h-60 w-full  text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                        {option.title}
                    </option>)
                ))}
            </select>
        </div>
    )
}

export const Input = ({ label, placeholder, type, bg }) => {
    return (
        <div className="text-sm w-full">
            <label className="font-semibold ">{label}</label>
            <input required
            type={type}
            placeholder={placeholder}
            className={`w-full text-sm mt-2 p-3 border border-primary text-white ${bg ? 'bg-green-900 bg-opacity-50' : 'bg-primary bg-opacity-50'} rounded`}
            />
        </div>
    )
}