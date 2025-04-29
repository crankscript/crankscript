import React, { createContext, useContext } from 'react';

type CrankScriptContextType = {
    verbose: boolean;
};

export const CrankScriptContext = createContext<CrankScriptContextType>({
    verbose: false,
});

export const CrankScriptProvider = ({
    children,
    verbose,
}: {
    children: React.ReactNode;
    verbose: boolean;
}) => {
    return (
        <CrankScriptContext.Provider value={{ verbose }}>
            {children}
        </CrankScriptContext.Provider>
    );
};

export const useCrankScriptContext = () => {
    const context = useContext(CrankScriptContext);

    if (!context) {
        throw new Error('CrankScriptContext not found');
    }

    return context;
};
