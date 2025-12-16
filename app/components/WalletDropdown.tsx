"use client"

import React from 'react';
import { Wallet } from 'lucide-react';
import { WalletDropdownProps } from './interfaces';

const WalletDropdown: React.FC<WalletDropdownProps> = ({
    options,
    selectedOption,
    onSelect,
    onClose
}) => {
    return (
        <div className="flex flex-col items-start p-2 sm:p-3 gap-2 w-full max-w-[464px] bg-white border border-[#E0E0E0] rounded-[15px] sm:rounded-[20px] shadow-lg z-10">
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => {
                        onSelect(option);
                        onClose();
                    }}
                    className={`flex items-center w-full p-2 sm:p-3 gap-2 rounded-xl cursor-pointer ${
                        selectedOption?.name === option.name
                            ? 'bg-[#F5F5F5]'
                            : 'hover:bg-[#F5F5F5]'
                    }`}
                >
                    {option.name === "Other Crypto Wallets (Binance, Coinbase, Bybit etc)" ? (
                        <div
                            className="w-5 h-4 "
                            style={{
                                backgroundImage: `url(${option.icon})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                    ) : (
                        <div
                            className="w-6 h-6 rounded-full "
                            style={{
                                backgroundImage: `url(${option.icon})`,
                                backgroundSize: 'cover'
                            }}
                        />
                    )}
                    <span
                        className="text-sm font-medium text-[#013941]"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        {option.name}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default WalletDropdown;
