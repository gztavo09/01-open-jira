interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string
    status: string
    createdAt: number
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'pending: Lorem ipsum  at dolorum',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'in-progress: Lorem ipsum  at dolorum 2',
            status: 'in-progress',
            createdAt: Date.now() - 10000
        },
        {
            description: 'finished: Lorem ipsum  at dolorum 3',
            status: 'finished',
            createdAt: Date.now() - 20000
        }
    ]
}