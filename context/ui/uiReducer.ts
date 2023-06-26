import { UIState } from "./";

type UIType = 
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - isAddingEntry', payload: boolean }


export const uiReducer = (state: UIState, action: UIType): UIState => {
    switch (action.type) {
        case 'UI - Open Sidebar': 
            return {
                ...state,
                sidemenuOpen: true
            }
        case 'UI - Close Sidebar': 
            return {
                ...state,
                sidemenuOpen: false
            }
        case 'UI - isAddingEntry': 
            return {
                ...state,
                isAddingEntry: action.payload
            }
        default:
            return state
    }
}