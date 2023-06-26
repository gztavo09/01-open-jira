import { createContext } from 'react';

interface ContextProps {
    sidemenuOpen: boolean,
    opensideMenu: () => void,
    closesideMenu: () => void,
    isAddingEntry: boolean,
    setIsAddingEntry: (status: boolean) => void
}

export const UIContext = createContext({} as ContextProps)