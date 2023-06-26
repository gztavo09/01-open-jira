import { EntriesContext } from '@/context/entries'
import { UIContext } from '@/context/ui'
import { Add, SaveOutlined } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'

export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext)

    // const [isAdding, setIsAdding] = useState(false)
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

    const [inputValue, setinputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const onTextFieldChanged = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setinputValue(event.target.value)
    }

    const onSave = () => {
        if( inputValue.length === 0) return;
        console.log(inputValue);
        addNewEntry(inputValue)
        setIsAddingEntry(false)
        setTouched(false)
        setinputValue('')
    }

    const onCancel = () => {
        setIsAddingEntry(false)
        setTouched(false)
        setinputValue('')
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1 }}>
            {
                isAddingEntry ? (
                    <>
                        <TextField 
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
                            onBlur={ ()=> setTouched(true) }
                            error={ inputValue.length == 0 && touched }
                            value={ inputValue }
                            onChange={(event) => onTextFieldChanged(event) }
                        />
                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant='text'
                                onClick={() => onCancel()}
                            >
                                    Cancelar
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                onClick={() => onSave()}
                                endIcon= {
                                    <SaveOutlined />
                                }
                            >
                                    Guardar
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Button
                        startIcon= { <Add /> }
                        fullWidth
                        variant='outlined'
                        onClick={() => setIsAddingEntry(true)}
                    >
                        Agregar Tarea
                    </Button>
                )
            }
        </Box>
    )
}
