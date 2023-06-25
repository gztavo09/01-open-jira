import { EntriesState } from "./";

type EntriesType = 
    | { type: '[Entries] - ActionName' }


export const entriesReducer = (state: EntriesState, action: EntriesType): EntriesState => {
    switch (action.type) {
        case '[Entries] - ActionName': 
            return {
                ...state,
            }
        default:
            return state
    }
}