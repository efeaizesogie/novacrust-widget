"use client"

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { DropdownProps } from './interfaces';

const Dropdown: React.FC<DropdownProps> = ({
    label,
    placeholder = "Select an option",
    selectedValue,
    onClick
}) => {
    return (
        <div className="flex flex-col items-start gap-4 w-full">
            <span
                className="w-full text-base font-medium text-[#013941]"
                style={{ fontFamily: 'Outfit, sans-serif' }}
            >
                {label}
            </span>
            <button
                onClick={onClick}
                className="flex items-center justify-between w-full px-4 sm:px-6 py-3 bg-white border border-[#E0E0E0] rounded-[20px] sm:rounded-[30px] h-[50px] sm:h-[60px] cursor-pointer"
            >
                <span
                    className="text-base font-normal text-[#013941]"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                    {selectedValue || placeholder}
                </span>
                <ChevronDown className="w-5 h-5 text-[#013941]" />
            </button>
        </div>
    );
};

export default Dropdown;