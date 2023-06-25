import { Drawer, Box, Typography, List, ListItemIcon, ListItem, ListItemText, Divider } from '@mui/material'
import { MailOutlineOutlined, InboxOutlined } from '@mui/icons-material'
import { useContext } from 'react'
import { UIContext } from '@/context/ui'

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {

    const { sidemenuOpen, closesideMenu } = useContext(UIContext)

  return (
    <Drawer
        anchor='left'
        onClose={ () => closesideMenu() }
        open={sidemenuOpen}
    >
        <Box sx={{ width: '250px' }}>
            <Box sx={{ padding: '5px 10px' }} >
                <Typography variant='h4'>Menú</Typography>
            </Box>

            <List>
                {
                    menuItems.map((item, index) => (
                        <ListItem button key={ item }>
                            <ListItemIcon>
                                {
                                    index % 2 ? <MailOutlineOutlined /> : <InboxOutlined />
                                }
                            </ListItemIcon>
                            <ListItemText primary={ item } />
                        </ListItem>
                    ))
                }
            </List>

            <Divider />

            <List>
                {
                    menuItems.map((item, index) => (
                        <ListItem button key={ item }>
                            <ListItemIcon>
                                {
                                    index % 2 ? <MailOutlineOutlined /> : <InboxOutlined />
                                }
                            </ListItemIcon>
                            <ListItemText primary={ item } />
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    </Drawer>
  )
}
