interface InputProps {
    name: string;
    id: string;
    autoComplete: string;
    placeholder: string;
  }
  
  export default function DefaultInput({ name, id, autoComplete, placeholder }: InputProps) {

    return(
        <div className="w-72 h-9 px-3 py-2 bg-white rounded border border-gray-400 flex items-center gap-3">
        <input
            type="text"
            name={name}
            id={id}
            autoComplete={autoComplete}
            className="flex-grow border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm focus:outline-none"
            placeholder={placeholder}
        />
        </div>
    )
  }
