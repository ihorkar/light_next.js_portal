import { ChangeEventHandler } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

interface InputProps {
    name: string;
    title?: string;
    id: string;
    autoComplete: string;
    placeholder?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    type?: 'default' | 'warning'
    disabled?: boolean;
    value?: string;
    pattern?: string;
    inputType?: string;
    checked?: boolean;
  }
  
  export default function DefaultInput({ name, title, id, autoComplete, placeholder, onChange, required, type = 'default', disabled = false, value, pattern, inputType = 'text', checked }: InputProps) {
    let classNames = inputType != "checkbox" ? "w-72 h-9 bg-white rounded border flex items-center gap-3" : "w-4 h-4 mt-2 bg-white rounded border flex items-center gap-3";
    if(type === "default"){
      classNames += "border-gray-400";
    }else{
      classNames += "border-red-500"
    }

    return(
      <div>
        <div className={classNames}>
          <input
            type={inputType}
            name={name}
            id={id}
            autoComplete={autoComplete}
            className="flex-grow rounded border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
            placeholder={placeholder}
            onChange={onChange}
            required={required ? required : false}
            disabled={disabled}
            value={value}
            pattern={pattern}
            checked={checked}
          />
          {type === "warning" && <div className="pointer-events-none absolute inset-y-0 right-36 flex items-center pr-3 -top-8">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>}
        </div>
         {type === "warning" && <p className="mt-2 text-sm text-red-600" id="email-error">
           Not a valid email address.
         </p>}
      </div>
    )
  }
