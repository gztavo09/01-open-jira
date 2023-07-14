import { db } from '@/database'
import { Entry, IEntry } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
    | { message: string }
    | IEntry
    | IEntry[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch(req.method) {
        case 'GET':
            return getEntries(res)
        case 'POST':
            return createEntry(req, res)
        default:
            res.status(400).json({ message: 'Endpoint doesnt exist' })
    }

    
}

const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connect()
    const entries = await Entry.find().sort({ createdAt: 'ascending' })
    await db.disconnect()
    res.status(200).json(entries)
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { description = '' } = req.body

    const newEntry = new Entry({
        description,
        createdAt: Date.now()
    })

    try {
        await db.connect()
        await newEntry.save()

        return res.status(201).json(newEntry)
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'algo salio mal al crear bro'})
    } finally {
        await db.disconnect()
    }
}