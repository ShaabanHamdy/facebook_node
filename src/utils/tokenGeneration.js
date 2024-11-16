import jwt from "jsonwebtoken"




export const tokenGeneration = (({
    payload = {},
    signature = process.env.TOKEN_SIGNATURE
}) => {
    const token = jwt.sign(payload, signature)
    return token
})


export const tokenDecode = (({
    payload = "",
    signature = process.env.TOKEN_SIGNATURE
}) => {

    const decode = jwt.verify(payload, signature)
    return decode
})
