import bcrypt from "bcrypt"

export const bcryptFunction = (password: Buffer) => {
    const salt = bcrypt.genSaltSync(10, "a");
    const encript = bcrypt.hashSync(password, salt);
    return encript
}