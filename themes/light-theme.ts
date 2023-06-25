import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#ddd'
        },
        primary: {
            main: '#4a148c'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: '#ff0000'
        }
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#4a148a'
                }
            }
        }
    }
})