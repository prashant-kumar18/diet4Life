import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext, useContext } from 'react'
import { useScheduleGetPatients } from '../utils/api';

const DataContext = createContext<any>(null);
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const data = useScheduleGetPatients();
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <DataProvider>{children}</DataProvider>
        </QueryClientProvider>
    )
}

export default ContextProvider