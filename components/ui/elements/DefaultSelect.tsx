'use client'

import { ChangeEventHandler, ReactNode } from "react";
import Select, { StylesConfig } from 'react-select';
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { SingleValue, ActionMeta } from "react-select";

export interface SelectProps {
    options: ISelectOption[];
    selectedOption: ISelectOption;
    onChange: (newValue: SingleValue<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) => void;
    required?: boolean;
}

export interface ISelectOption {
    label: string;
    value?: string;
    image?: ReactNode;
}

export default function DefaultSelect ({options, selectedOption, onChange, required}: SelectProps) {

    return(
        <div className="w-72 h-9">
           <Select
                options={options}
                isSearchable={false}
                onChange={onChange}
                isOptionSelected={() => false}
                value={selectedOption}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => <ChevronUpDownIcon className="w-6 h-6" />
                }}
                formatOptionLabel={formatOptionLabel}
            />
        </div>
    )
}

const formatOptionLabel = (option: ISelectOption) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            {option.image ? <>
                <div style={{flexGrow: '1', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                    {option.image}
                </div>
                <div style={{textAlign: 'right'}}>
                    {option.label}
                </div>
            </> : <div>{option.label}</div>}
        </div>
    )
}