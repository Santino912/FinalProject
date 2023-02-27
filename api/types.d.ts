export type Role = "User" | "Admin"
export type Plan = "Regular" | "Premium"

export interface UserToCreate {
    body: {
        _id?: String
        name: String,
        role: Role,
        plan: Plan,
        email: String,
        password: Buffer,
        username: String,
        idGoogle: String
        avatar?: String,
        banner?: String,
    }
}

export interface UserToFind {
    params: {
        _id: String
    }
}