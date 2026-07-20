import User from "./User"
import Item from "./Item"

export default class Payment {
    idx:number
    userIdx:number
    itemIdx:number
    createdAt:Date

    user:User | null
    item:Item | null

    constructor({idx, userIdx, itemIdx, createdAt, user, item}:Payment) {
        this.idx = idx || 0
        this.userIdx = userIdx || 0
        this.itemIdx = itemIdx || 0
        this.createdAt = createdAt || new Date()
        this.user = user || null
        this.item = item || null
    }

    static fromJson(json:any):Payment {
        return new Payment({
            idx: json.idx || 0,
            userIdx: json.user_idx || 0,
            itemIdx: json.item_idx || 0,
            createdAt: json.created_at || new Date(),
            user: User.fromJson(json.user) || null,
            item: Item.fromJson(json.item) || null
        })
    }


    static fromJsonList(jsonList:any[]):Payment[] {
        return jsonList.map(json => Payment.fromJson(json))
    }
}

