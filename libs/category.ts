export interface ICategory {
    id:string
    name: string
    imgPath: string
}

export class Category implements ICategory {
    id:string
    name: string
    imgPath: string

    constructor(id:string, name: string, imgPath: string) {
        this.id = id
        this.name = name
        this.imgPath = imgPath
    }
}