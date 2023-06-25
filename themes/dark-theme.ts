import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
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