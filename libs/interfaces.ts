type Gender = 'Male' | 'Female' | 'Other'

type GameType = "Acción" | "Aventura" | "Deportes" | "Estrategia" | "Rol" | "Simuladores" | "Casuales" | "Multijugador"

export interface User {
    name: string 
    username: string 
}

export interface Game {
    title: string 
    type: GameType 
    users: User[] 
}