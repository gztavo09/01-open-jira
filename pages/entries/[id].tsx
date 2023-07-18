import { Layout } from '@/components/layouts'
import { Entry, EntryStatus } from '@/interfaces'
import { DeleteOutline, SaveOutlined } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, capitalize } from '@mui/material'
import React, { ChangeEvent, FC, useContext, useState } from 'react'
import { useMemo } from 'react';
import { GetServerSideProps } from 'next'
import { isValidObjectId } from 'mongoose'
import { dbEntries } from '@/database'
import { EntriesContext } from '@/context/entries'
import { getFormatDistanceToNow } from '@/utils'

const validStatus: EntryStatus[] = ['pending', 'finished', 'in-progress']

interface Props {
    entry: Entry
}

const EntryPage:FC<Props> = ({ entry }) => {

    const { updatedEntry } = useContext(EntriesContext)
    

    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onTextFieldChanged = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue(event.target.value)
    }

    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = () => {
        if(inputValue.trim().length === 0) return 
        const newEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        updatedEntry(newEntry, true)
    }

    return (
        <Layout title={ inputValue.substring(0, 20) + '...' }>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader 
                            title={`Entrada:`}
                            subheader={`Creada ${getFormatDistanceToNow(entry.createdAt)}`}
                        />
                        <CardContent>
                            <TextField  
                                sx={{ marginTop: 2, marginBottom: 2 }}
                                fullWidth
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                value={inputValue}
                                onChange={onTextFieldChanged}
                                helperText={ isNotValid && `Ingrese un valor`}
                                onBlur={ ()=> setTouched(true) }
                                error={ isNotValid }
                            />
                            <FormControl>
                                <FormLabel>
                                    Estado
                                </FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel 
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={ capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlined />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton 
                sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}
            >
                <DeleteOutline />
            </IconButton>
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = async({ params }) => {
    
    //aqui se puede hacer una peticion al backend axios o fetch

    //validacion con mongoose
    const { id } = params as { id: string }

    const entry = await dbEntries.getEntryById(id)

    if(!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    return {
        props: {
            entry
        }
    }
}

export default EntryPage
