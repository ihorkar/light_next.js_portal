import { ChangeEventHandler } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

interface InputProps {
    name: string;
    id: string;
    autoComplete: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    type?: 'default' | 'warning'
    disabled?: boolean;
    value?: string;
  }
  
  export default function DefaultInput({ name, id, autoComplete, placeholder, onChange, required, type = 'default', disabled = false, value }: InputProps) {
    let classNames = "w-72 h-9 px-3 py-2 bg-white rounded border flex items-center gap-3";
    if(type === "default"){
      classNames += "border-gray-400";
    }else{
      classNames += "border-red-500"
    }

    return(
      <div>
        <div className={classNames}>
          <input
            type="text"
            name={name}
            id={id}
            autoComplete={autoComplete}
            className="flex-grow border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm focus:outline-none"
            placeholder={placeholder}
            onChange={onChange}
            required={required ? required : false}
            disabled={disabled}
            value={value}
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
