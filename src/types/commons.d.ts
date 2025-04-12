export type WithId = {
    id: string
}

export type WithName = {
    name: string
}

export type Entity =  WithId & WithName;
