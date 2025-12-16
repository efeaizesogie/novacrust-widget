// Tab Component
import React from "react";

interface TabProps {
    tabs: string[];
    activeTab: number;
    onTabChange: (index: number) => void;
}

 const TabSelector: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex items-start p-0 bg-[#F2F2F2] rounded-[20px] sm:rounded-[30px] w-fit mx-auto">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => onTabChange(index)}
                    className={`flex items-center justify-center px-3 sm:px-4 py-2 rounded-[20px] sm:rounded-[30px] text-xs sm:text-sm font-medium transition-all duration-300 ease-in-out transform whitespace-nowrap ${
                        activeTab === index
                            ? 'bg-[#013941] text-[#Ffffff] scale-105'
                            : 'bg-[#F2F2F2] text-[#828282] hover:bg-[#E8E8E8] hover:scale-102'
                    }`}
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TabSelector;
