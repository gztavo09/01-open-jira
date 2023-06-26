import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean
}
const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false
}

export const UIProvider: FC = ({ children }: any) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const opensideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' })
    }

    const closesideMenu = () => dispatch({ type: 'UI - Close Sidebar' })

    const setIsAddingEntry = (status: boolean) => dispatch({ type: 'UI - isAddingEntry', payload: status })

    return (
        <UIContext.Provider value={{
            ...state,
            opensideMenu,
            closesideMenu,
            setIsAddingEntry
        }}>
            {
                 children
            }
       </UIContext.Provider>
    )
}