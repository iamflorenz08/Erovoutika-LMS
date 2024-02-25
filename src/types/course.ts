

export interface ICourse {
    _id?: string,
    format?: 'self-paced' | 'virtual' | 'hybrid',
    banner?: string,
    name?: string,
    status: 'published' | 'unpublished'
}