import User from "./User"

export default class Item {
    idx: number
    userIdx: number
    imgUrl: string
    name: string
    price: number
    description: string
    createdAt: Date
    updatedAt: Date
    isActive: String
    user: User | null

    constructor({
        idx,
        userIdx,
        imgUrl,
        name,
        price,
        description,
        createdAt,
        updatedAt,
        isActive,
        user,
    }: Item) {
        this.idx = idx || 0
        this.userIdx = userIdx || 0
        this.imgUrl = imgUrl || ""
        this.name = name || ""
        this.price = price || 0
        this.description = description || ""
        this.createdAt = createdAt || new Date()
        this.updatedAt = updatedAt || new Date()
        this.isActive = isActive || ""
        this.user = user || null
    }

    static fromJson(json: any): Item {
        return new Item({
            idx: json.idx || 0,
            userIdx: json.user_idx || 0,
            imgUrl: json.img_url || "",
            name: json.name || "",
            price: json.price || 0,
            description: json.description || "",
            createdAt: json.created_at || new Date(),
            updatedAt: json.updated_at || new Date(),
            isActive: json.is_active || "",
            user: User.fromJson(json.user) || null,
        })
    }


    static fromJsonList(jsonList: any[]): Item[] {
        return jsonList.map((json:any)=>Item.fromJson(json))
    }
}
