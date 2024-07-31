import { IInputProps } from "../constants/interfaces";

const Input = ({ 
  name, 
  type, 
  label, 
  placeholder, 
  value, 
  handleChange, 
  focus = true, 
  readOnly = false,
  notRequired = false
}: IInputProps) => {
  
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 font-medium text-[15px] dark:text-white">
          {label}
        </div>
      )}
      <input 
        required={!notRequired}
        name={name}
        type={type} 
        placeholder={placeholder}
        className={`w-full bg-lite-1 outline outline-1 outline-lite-2 px-2 py-1.5 rounded-[3px] dark:bg-dark-2 dark:outline-dark-3 dark:placeholder:text-lite-2/70 dark:text-lite-2 ${focus && "focus:outline-lite-3 dark:focus:outline-sky-300 dark:focus:outline-2"}`}
        value={value}
        readOnly={readOnly}
        autoComplete={type === "email" ? "on" : "off"}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
