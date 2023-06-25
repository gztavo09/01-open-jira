import { createContext } from 'react';

interface ContextProps {
    sidemenuOpen: boolean,
    opensideMenu: () => void,
    closesideMenu: () => void
}

export const UIContext = createContext({} as ContextProps)