"use client"

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { CryptoDropdownProps } from './interfaces';

const CryptoDropdown: React.FC<CryptoDropdownProps> = ({
    options,
    selectedOption,
    onSelect,
    onClose
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOptions = options.filter(option =>
        `${option.symbol}-${option.network}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full max-w-[264px] mx-auto flex flex-col items-start p-2 sm:p-3 gap-2 bg-white border border-[#E0E0E0] rounded-[15px] sm:rounded-[20px] shadow-lg z-30">
            <div className="flex items-center w-full px-3 sm:px-4 py-2 sm:py-3 gap-2 bg-white border border-[#E0E0E0] rounded-[15px] sm:rounded-[20px]">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#828282]" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-xs sm:text-sm font-normal text-[#828282] bg-transparent outline-none flex-1"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                />
            </div>
            {filteredOptions.map((option, index) => (
                <button
                    key={index}
                    onClick={() => {
                        onSelect(option);
                        onClose();
                    }}
                    className={`flex items-center w-full p-3 gap-2 rounded-xl ${
                        selectedOption?.symbol === option.symbol && selectedOption?.network === option.network
                            ? 'bg-[#F5F5F5]'
                            : 'hover:bg-[#F5F5F5]'
                    }`}
                >
                    <div
                        className="w-6 h-6 rounded-full border-none "
                        style={{
                            backgroundImage: `url(${option.icon})`,
                            backgroundSize: 'cover'
                        }}
                    />
                    <span
                        className="text-sm font-medium text-[#013941]"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        {option.symbol} - {option.network}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default CryptoDropdown;
