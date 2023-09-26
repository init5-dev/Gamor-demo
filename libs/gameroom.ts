export type TPlatform = "Party" | "Match" | "Stream"
export type TCategory = "Action" | "Adventure" | "Fantasy" | "Sports" | "Strategy" | "Role-Playing" | "Simulation" | "Casual" | "FPS";

export interface IRoom {
    name: string
    platform: string
    game: Game
    members: string[]
}

export interface IGame {
    name: string
    category: string
}

export class Room implements IRoom {
    name: string
    platform: string
    game: Game
    members: string[]

    constructor(name: string, platform: string, game: Game, members: string[]) {
        this.name = name
        this.platform = platform
        this.game = game
        this.members = members
    }
}

export class Game implements IGame {
    name: string
    category: string

    constructor(name: string, category: string) {
        this.name = name
        this.category = category
    }
}

