import { Entry } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps { // interface que el context exporta a sus hijos 
    entries: Entry[];
    addNewEntry: (description: string) => void;
    updatedEntry: (entry: Entry) => void
}

export const EntriesContext = createContext({} as ContextProps)