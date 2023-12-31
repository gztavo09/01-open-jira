import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = 
    | { message: string }
    | IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data> ) {
    
    const { id } = req.query

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Id no valido ' + id })
    }

    switch (req.method) {
        case 'GET':
            return getEntryById(req, res)
        case 'PUT':
            return updateEntry(req, res)
        default:
            return res.status(400).json({ message: 'Metodo no existe' + id })
    }   
}

const getEntryById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query

    try {
        await db.connect()

        const entry = await Entry.findById(id)

        if(!entry) {
            await db.disconnect()
            return res.status(400).json({ message: 'No existe el ID' + id })
        }

        await db.disconnect()
        return res.status(200).json(entry)

    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: error.errros.status})
    } 
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id } = req.query
    
    try {
        await db.connect()

        const entryToUpdate = await Entry.findById(id)

        if(!entryToUpdate) {
            await db.disconnect()
            return res.status(400).json({ message: 'No existe el ID' + id })
        }

        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status
        } = req.body

        const updatedEntry = await Entry.findByIdAndUpdate(id, {
            description,
            status
        },
        {
            runValidators: true,
            new: true
        }
        )
        await db.disconnect()
        return res.status(200).json(updatedEntry!)

    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: error.errros.status})
    } 
}