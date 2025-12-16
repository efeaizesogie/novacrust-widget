"use client"

import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import TabSelector from "@/app/components/tab";
import AmountInput from './AmountInput';
import Dropdown from './Dropdown';
import CryptoDropdown from './CryptoDropdown';
import WalletDropdown from './WalletDropdown';
import { Currency, CryptoOption, WalletOption } from './interfaces';

// Main Widget Component
const CryptoConverterWidget: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [payAmount, setPayAmount] = useState('1.00');
    const [receiveAmount, setReceiveAmount] = useState('0.00');
    const [isConverting, setIsConverting] = useState(false);
    const [conversionError, setConversionError] = useState<string | null>(null);
    const [exchangeRate, setExchangeRate] = useState<number>(0);

    const [showWalletFromDropdown, setShowWalletFromDropdown] = useState(false);
    const [showWalletToDropdown, setShowWalletToDropdown] = useState(false);

    const [payCurrency, setPayCurrency] = useState<Currency>({ symbol: 'ETH', icon: '/icons/eth.svg' });
    const [receiveCurrency, setReceiveCurrency] = useState<Currency>({ symbol: 'NGN', icon: '/icons/ngn.svg' });

    const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption>();
    const [selectedReceiveCrypto, setSelectedReceiveCrypto] = useState<CryptoOption>();
    const [selectedWalletFrom, setSelectedWalletFrom] = useState<WalletOption>();
    const [selectedWalletTo, setSelectedWalletTo] = useState<WalletOption>();


    const walletFromDropdownRef = useRef<HTMLDivElement>(null);
    const walletToDropdownRef = useRef<HTMLDivElement>(null);
    const walletFromTriggerRef = useRef<HTMLDivElement>(null);
    const walletToTriggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
           
            if (showWalletFromDropdown && 
                walletFromDropdownRef.current && 
                !walletFromDropdownRef.current.contains(event.target as Node) &&
                walletFromTriggerRef.current &&
                !walletFromTriggerRef.current.contains(event.target as Node)) {
                setShowWalletFromDropdown(false);
            }

            if (showWalletToDropdown && 
                walletToDropdownRef.current && 
                !walletToDropdownRef.current.contains(event.target as Node) &&
                walletToTriggerRef.current &&
                !walletToTriggerRef.current.contains(event.target as Node)) {
                setShowWalletToDropdown(false);
            }
        };

    
        if (showWalletFromDropdown || showWalletToDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showWalletFromDropdown, showWalletToDropdown]);

    useEffect(() => {
        if (selectedCrypto) {
            const newCurrency: Currency = {
                symbol: selectedCrypto.symbol,
                icon: selectedCrypto.icon
            };
            
            setPayCurrency(newCurrency);
        }
    }, [selectedCrypto]);

    
    useEffect(() => {
        if (selectedReceiveCrypto) {
            const newCurrency: Currency = {
                symbol: selectedReceiveCrypto.symbol,
                icon: selectedReceiveCrypto.icon
            };
       
            setReceiveCurrency(newCurrency);
        }
    }, [selectedReceiveCrypto]);

    
    useEffect(() => {
        const convertAmount = async () => {
            if (!payAmount || payAmount === '0' || payAmount === '0.00') {
                setReceiveAmount('0.00');
                return;
            }

            try {
               
                const rates: Record<string, number> = {
                    'ETH-NGN': 6500000, // 1 ETH = 6.5M NGN
                    'USDT-NGN': 1650,   // 1 USDT = 1650 NGN
                    'NGN-ETH': 0.00000015,
                    'NGN-USDT': 0.0006,
                };

                const fromSymbol = payCurrency.symbol;
                const toSymbol = receiveCurrency.symbol;
                const rateKey = `${fromSymbol}-${toSymbol}`;
                const rate = rates[rateKey] || 1;
                
                setExchangeRate(rate);
                const converted = (parseFloat(payAmount) * rate).toFixed(2);
                setReceiveAmount(converted);
                setConversionError(null);
            } catch (error) {
                setConversionError('Conversion failed');
                setReceiveAmount('0.00');
            }
        };

        const timeoutId = setTimeout(convertAmount, 300);
        return () => clearTimeout(timeoutId);
    }, [payAmount, payCurrency.symbol, receiveCurrency.symbol]);

    const handleConvert = async () => {
        // Form validation
        if (!payAmount || payAmount === '0' || payAmount === '0.00') {
            toast.error('Please enter an amount to convert');
            return;
        }

        if (!selectedWalletFrom) {
            toast.error('Please select a wallet to pay from');
            return;
        }

        if (!selectedWalletTo) {
            toast.error('Please select a wallet to pay to');
            return;
        }

        setIsConverting(true);
        setConversionError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mock success/error (80% success rate)
            if (Math.random() > 0.2) {
                // Success - you could redirect or show success message
                toast.success(`Successfully converted ${payAmount} ${payCurrency.symbol} to ${receiveAmount} ${receiveCurrency.symbol}`);
            } else {
                throw new Error('Transaction failed. Please try again.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Conversion failed';
            setConversionError(errorMessage);
            // Clear error after 5 seconds
            setTimeout(() => setConversionError(null), 5000);
        } finally {
            setIsConverting(false);
        }
    };

    const cryptoOptions: CryptoOption[] = [
        { symbol: 'ETH', network: 'Ethereum', icon: '/icons/eth.svg' },
        { symbol: 'NGN', network: 'Fiat', icon: '/icons/ngn.svg' },
        { symbol: 'USDT', network: 'CELO', icon: '/icons/usdt-celo.svg' },
        { symbol: 'USDT', network: 'TON', icon: '/icons/usdt-ton.svg' },
        { symbol: 'USDT', network: 'BNB', icon: '/icons/usdt-bnb.svg' },
    ];

    const walletOptions: WalletOption[] = [
        { name: 'Metamask', icon: '/icons/metamask.svg' },
        { name: 'Rainbow', icon: '/icons/rainbow.svg' },
        { name: 'WalletConnect', icon: '/icons/walletconnect.svg' },
        { name: 'Other Crypto Wallets (Binance, Coinbase, Bybit etc)', icon: '/icons/wallet.svg' },
    ];

    return (
        <div className="relative w-full max-w-[640px] bg-white border border-[#CCF6E5] rounded-[10px] sm:rounded-[30px] px-3 sm:px-6 md:px-16 pb-6 sm:pb-8 md:pb-14 pt-4 sm:pt-6 md:pt-10 mx-auto">
            <TabSelector
                tabs={['Crypto to cash', 'Cash to crypto', 'Crypto to fiat loan']}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="py-4 sm:py-6 md:py-10 flex flex-col items-start gap-3 sm:gap-4 md:gap-6 w-full max-w-[512px]">
                <AmountInput
                    label="You pay"
                    value={payAmount}
                    currency={payCurrency}
                    onValueChange={setPayAmount}
                    cryptoOptions={cryptoOptions}
                    selectedCrypto={selectedCrypto}
                    onCryptoSelect={setSelectedCrypto}
                />

                <AmountInput
                    label="You receive"
                    value={receiveAmount}
                    currency={receiveCurrency}
                    readOnly
                    cryptoOptions={cryptoOptions}
                    selectedCrypto={selectedReceiveCrypto}
                    onCryptoSelect={setSelectedReceiveCrypto}
                />

                <div className="relative w-full">
                    <div ref={walletFromTriggerRef}>
                        <Dropdown
                            label="Pay from"
                            placeholder="Select an option"
                            selectedValue={selectedWalletFrom?.name}
                            onClick={() => setShowWalletFromDropdown(!showWalletFromDropdown)}
                        />
                    </div>
                    <div 
                        ref={walletFromDropdownRef} 
                        className={`absolute top-full left-0 z-20 mt-1 w-full transition-all duration-200 ease-in-out transform origin-top ${
                            showWalletFromDropdown 
                                ? 'opacity-100 scale-y-100 translate-y-0' 
                                : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                        }`}
                    >
                        <WalletDropdown
                            options={walletOptions}
                            selectedOption={selectedWalletFrom}
                            onSelect={setSelectedWalletFrom}
                            onClose={() => setShowWalletFromDropdown(false)}
                        />
                    </div>
                </div>

                <div className="relative w-full">
                    <div ref={walletToTriggerRef}>
                        <Dropdown
                            label="Pay to"
                            placeholder="Select an option"
                            selectedValue={selectedWalletTo?.name}
                            onClick={() => setShowWalletToDropdown(!showWalletToDropdown)}
                        />
                    </div>
                    <div 
                        ref={walletToDropdownRef} 
                        className={`absolute bottom-full left-0 z-20 mb-1 w-full transition-all duration-200 ease-in-out transform origin-bottom ${
                            showWalletToDropdown 
                                ? 'opacity-100 scale-y-100 translate-y-0' 
                                : 'opacity-0 scale-y-0 translate-y-2 pointer-events-none'
                        }`}
                    >
                        <WalletDropdown
                            options={walletOptions}
                            selectedOption={selectedWalletTo}
                            onSelect={setSelectedWalletTo}
                            onClose={() => setShowWalletToDropdown(false)}
                        />
                    </div>
                </div>
            </div>

            {conversionError && (
                <div className="w-full max-w-[512px] p-3 bg-red-50 border border-red-200 rounded-[20px] mx-auto">
                    <p className="text-sm text-red-600 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {conversionError}
                    </p>
                </div>
            )}

            <button
                onClick={handleConvert}
                disabled={isConverting}
                className={`flex items-center justify-center px-6 sm:px-10 py-4 sm:py-5 gap-2 w-full max-w-[512px] h-[60px] rounded-[30px] transition-all mx-auto cursor-pointer ${
                    isConverting || !payAmount || payAmount === '0'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#013941] hover:bg-[#024651]'
                }`}
            >
                {isConverting ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span
                            className="text-base font-bold text-white"
                            style={{ fontFamily: 'Instrument Sans, sans-serif' }}
                        >
                            Converting...
                        </span>
                    </>
                ) : (
                    <span
                        className="text-base font-bold text-[#E6FBF2]"
                        style={{ fontFamily: 'Instrument Sans, sans-serif' }}
                    >
                        Convert now
                    </span>
                )}
            </button>

        </div>
    );
};

export default CryptoConverterWidget;
