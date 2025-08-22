import React from 'react';

const DashboardUI = ({ title, clientName, roleId, handleLogout, message }) => {
    return (
        <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4">
            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-[#1E293B]/10">
                {/* Header Section with Gradient */}
                <div className="bg-gradient-to-r from-[#1E293B] to-[#2563EB] p-6 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-light tracking-wide">{title}</h1>
                            {clientName && (
                                <p className="mt-2 text-[#F1F5F9] font-extralight">
                                    Welcome, <span className="font-medium">{clientName}</span>
                                </p>
                            )}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                    {roleId && (
                        <div className="mb-6 flex items-center">
                            <div className="bg-[#10B981]/10 p-2 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span className="text-sm text-[#94A3B8]">Role: <span className="font-medium text-[#10B981]">{roleId}</span></span>
                        </div>
                    )}

                    {!clientName && !roleId && (
                        <div className="mb-6 p-3 bg-[#EF4444]/10 rounded-lg flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EF4444] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="text-sm text-[#EF4444]">No user information found</span>
                        </div>
                    )}

                    <div className="bg-[#F1F5F9] p-4 rounded-xl mb-6">
                        <p className="text-[#334155] text-center font-light">{message}</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full py-3 px-4 bg-white border border-[#EF4444]/20 text-[#EF4444] rounded-xl hover:bg-[#EF4444] hover:text-white hover:cursor-pointer transition-all duration-300 flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </button>
                </div>

                {/* Subtle Footer */}
                <div className="bg-[#F1F5F9] p-4 text-center">
                    <p className="text-xs text-[#94A3B8]">Sugamta Insurance Portal | Version 2.4</p>
                    <p className="text-xs text-[#94A3B8]">© 2025 Sugamta Insurance. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardUI;