
export interface User {
    name: string 
    username: string
}

export interface Game {
    title: string 
    type: string 
    platform: string
    users: User[] 
}

export class User {

    name: string
    username: string

    constructor(name:string, username:string) {
        this.name = name
        this.username = username
    }
}

export class Game {

    title: string 
    type: string 
    platform: string
    users: User[] 

    constructor(title: string, type: string, platform: string, users: User[]) {
        this.title = title
        this.type = type
        this.platform = platform
        this.users = users
    }
}