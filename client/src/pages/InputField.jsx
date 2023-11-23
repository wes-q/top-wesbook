import { useState, useEffect } from "react";

const InputField = ({ setFormData, formData, label, name, value, placeholder, reset, setReset }) => {
    const [isDisabled, setIsDisabled] = useState(true);

    const handleChangeClicked = (event) => {
        event.preventDefault();
        setIsDisabled(false);
        setReset(false);
    };

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value, type, files } = event.target;
        // If the input is a file input, use `files` to get the selected file(s)
        const newValue = type === "file" ? files[0] : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    useEffect(() => {
        if (reset) {
            setIsDisabled(true);
        }
    }, [reset]);

    return (
        <label>
            <span className="block text-sm font-medium text-white">{label}</span>
            <div className="relative">
                <input type="text" name={name} value={value} onChange={handleInputChange} maxLength="35" className="mt-1 mb-2 px-3 py-2 bg-white text-black border-2 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  valid:border-green-400 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 truncate" placeholder={placeholder} autoComplete={name} pattern=".*\S+.*" disabled={isDisabled} spellCheck="false" />
                <button type="button" className="absolute top-[9px] right-4 text-sm text-gray-600 hover:text-cyan-600" onClick={handleChangeClicked}>
                    Change
                </button>
            </div>
        </label>
    );
};

export default InputField;
