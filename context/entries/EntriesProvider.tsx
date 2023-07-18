import { FC, useEffect, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '@/interfaces'
import { entriesApi } from '@/apis'
import { useSnackbar } from 'notistack'

export interface EntriesState { // interface de estado
    entries: Entry[]
}
const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider: FC = ({ children }: any) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const addNewEntry = async ( description: string ) => {
        const { data } = await entriesApi.post<Entry>('/entries', {
            description
        })

        dispatch({ type: '[Entries] - Add-Entry', payload: data })
    }   

    const updatedEntry = async ({ description, status, _id }: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>('/entries/' + _id, {
                description,
                status
            })

            dispatch({ type: '[Entries] - Update-Entry', payload: data })

            if(showSnackbar) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 3000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entries] - Refresh-Data', payload: data })
    }

    useEffect(() => {
      refreshEntries()
    }, [])
    

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updatedEntry
        }}>
            {
                 children
            }
       </EntriesContext.Provider>
    )
}