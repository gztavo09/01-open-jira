import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import { useContext } from 'react'
import { UIContext } from '@/context/ui'
import NextLink from 'next/link'

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
            <NextLink href='/' passHref>
              <Link underline='none' color='white'>
                <Typography variant='h6'>OpenJira</Typography>
              </Link>
            </NextLink>
            
        </Toolbar>
    </AppBar>
  )
}
