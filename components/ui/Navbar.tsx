import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import { useContext } from 'react'
import { UIContext } from '@/context/ui'

export const Navbar = () => {

  const { opensideMenu } = useContext(UIContext)

  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton
                edge='start'
                size='large'
                onClick={() => opensideMenu()}
            >
                <MenuOutlined />
            </IconButton>
            <Typography variant='h6'>OpenJira</Typography>
        </Toolbar>
    </AppBar>
  )
}
