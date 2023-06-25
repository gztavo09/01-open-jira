import { FC, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '@/interfaces'

export interface EntriesState { // interface de estado
    entries: Entry[]
}
const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Lorem ipsum  at dolorum',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'Lorem ipsum  at dolorum 2',
            status: 'in-progress',
            createdAt: Date.now() - 10000
        },
        {
            _id: uuidv4(),
            description: 'Lorem ipsum  at dolorum 3',
            status: 'finished',
            createdAt: Date.now() - 20000
        }
    ]
}

export const EntriesProvider: FC = ({ children }: any) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    return (
        <EntriesContext.Provider value={{
            ...state
        }}>
            {
                 children
            }
       </EntriesContext.Provider>
    )
}