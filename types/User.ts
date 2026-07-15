export default class User {
    idx:number
    id:string
    pw:string
    nick:string
    address1:string
    address2:string
    point:number
    createdAt:Date
    updatedAt:Date
    isActive:String
    lat:number
    lng:number
   

    constructor({idx, id, pw, nick, address1, address2, point, createdAt, updatedAt, isActive, lat, lng}:User) {
        this.idx = idx || 0
        this.id = id || ""
        this.pw = pw || ""
        this.nick = nick || ""
        this.address1 = address1 || ""
        this.address2 = address2 || ""
        this.point = point || 0
        this.createdAt = createdAt || new Date()
        this.updatedAt = updatedAt || new Date()
        this.isActive = isActive || ""
        this.lat = lat || 0 
        this.lng = lng || 0
    }


    static fromJson(json:any):User {
        return new User({
            idx:json.idx || 0,
            id:json.id || "",
            pw:json.pw || "",
            nick:json.nick || "",
            address1:json.address1 || "",
            address2:json.address2 || "",
            point:json.point || 0,
            createdAt:json.created_at || new Date(),
            updatedAt:json.updated_at || new Date(),
            isActive:json.is_active || "",
            lat:json.lat || 0,
            lng:json.lng || 0,
        })
    }
}