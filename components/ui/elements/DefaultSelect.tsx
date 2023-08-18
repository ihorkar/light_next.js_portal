'use client'

import { ChangeEventHandler } from "react";

export interface SelectProps {
    options: string[];
    selectedOption: string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    required?: boolean;
}

export default function DefaultSelect ({options, selectedOption, onChange, required}: SelectProps) {

    return(
        <div className="w-72 h-9 px-3 py-2 bg-white rounded border border-gray-400 flex items-center gap-3">
            <select
                className="flex-grow border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm focus:outline-none"
                required={required ? required : false}
                onChange={onChange}
                defaultValue={selectedOption}
            >
                {options.map((option, index) => {
                    return (
                        <option key={`option-${index}`}>{option}</option>
                    )
                })}    
            </select>
        </div>
    )
}