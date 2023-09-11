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
        <div className="w-72 h-9">
            <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                required={required ? required : false}
                onChange={onChange}
                defaultValue={selectedOption}
            >
                {options.map((option, index) => {
                    return (
                        <option className="p-1 rounded" key={`option-${index}`}>{option}</option>
                    )
                })}    
            </select>
        </div>
    )
}