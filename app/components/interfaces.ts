// Interfaces for the Payment Widget components

// Currency interface
export interface Currency {
    symbol: string;
    icon: string;
    name?: string;
}

// Crypto option interface
export interface CryptoOption {
    symbol: string;
    network: string;
    icon: string;
}

// Wallet option interface
export interface WalletOption {
    name: string;
    icon: string;
}

// Currency Selector Props
export interface CurrencySelectorProps {
    currency: Currency;
    onClick?: () => void;
    showDropdown?: boolean;
}

// Amount Input Props
export interface AmountInputProps {
    label: string;
    value: string;
    currency: Currency;
    onValueChange?: (value: string) => void;
    onCurrencyClick?: () => void;
    readOnly?: boolean;
}

// Dropdown Props
export interface DropdownProps {
    label: string;
    placeholder?: string;
    selectedValue?: string;
    onClick: () => void;
}

// Crypto Dropdown Props
export interface CryptoDropdownProps {
    options: CryptoOption[];
    selectedOption?: CryptoOption;
    onSelect: (option: CryptoOption) => void;
    onClose: () => void;
}

// Wallet Dropdown Props
export interface WalletDropdownProps {
    options: WalletOption[];
    selectedOption?: WalletOption;
    onSelect: (option: WalletOption) => void;
    onClose: () => void;
}