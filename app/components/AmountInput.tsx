"use client"

import React, { useState, useEffect, useRef } from 'react';
import { AmountInputProps, CryptoOption } from './interfaces';
import CurrencySelector from './CurrencySelector';
import CryptoDropdown from './CryptoDropdown';

const AmountInput: React.FC<AmountInputProps & {
    cryptoOptions?: CryptoOption[];
    selectedCrypto?: CryptoOption;
    onCryptoSelect?: (option: CryptoOption) => void;
}> = ({
    label,
    value,
    currency,
    onValueChange,
    onCurrencyClick,
    readOnly = false,
    cryptoOptions,
    selectedCrypto,
    onCryptoSelect
}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showDropdown && 
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleCurrencyClick = () => {
        if (cryptoOptions) {
            setShowDropdown(!showDropdown);
        }
        onCurrencyClick?.();
    };
    return (
        <div className="relative w-full">
            <div className="flex flex-col justify-center items-center p-4 sm:p-6 gap-2 w-full bg-white border border-[#E0E0E0] rounded-[20px] sm:rounded-[30px]">
                <span
                    className="w-full text-base font-medium text-[#828282]"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                    {label}
                </span>
                <div className="flex items-center justify-between w-full gap-4">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onValueChange?.(e.target.value)}
                        readOnly={readOnly}
                        className="text-xl sm:text-2xl font-semibold text-[#000E10] bg-transparent outline-none w-full"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                        placeholder="0.00"
                    />
<div className='relative'>
    <div ref={triggerRef}>
        <CurrencySelector currency={currency} onClick={handleCurrencyClick} />
    </div>

    {cryptoOptions && (
                <div 
                    ref={dropdownRef} 
                    className={`absolute top-full right-0 z-20 mt-1 w-[264px] transition-all duration-200 ease-in-out transform origin-top ${
                        showDropdown 
                            ? 'opacity-100 scale-y-100 translate-y-0' 
                            : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                    }`}
                >
                    <CryptoDropdown
                        options={cryptoOptions}
                        selectedOption={selectedCrypto}
                        onSelect={(option) => {
                            onCryptoSelect?.(option);
                            setShowDropdown(false);
                        }}
                        onClose={() => setShowDropdown(false)}
                    />
                </div>
            )}
</div>
                    
                </div>
            </div>
            
        </div>
    );
};

export default AmountInput;