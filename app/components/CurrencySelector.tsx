"use client"

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { CurrencySelectorProps } from './interfaces';

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
    currency,
    onClick,
    showDropdown = true
}) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center px-3 py-2 gap-1 bg-[#F7F7F7] border border-[#E0E0E0] rounded-[20px] h-9"
        >
            <div
                className="w-5 h-5 rounded-full bg-white "
                style={{
                    backgroundImage: `url(${currency.icon})`,
                    backgroundSize: 'cover'
                }}
            />
            <span
                className="text-sm font-medium text-[#013941]"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
                {currency.symbol}
            </span>
            {showDropdown && <ChevronDown className="w-5 h-5 text-[#013941]" />}
        </button>
    );
};

export default CurrencySelector;