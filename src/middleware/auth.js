
import { asyncHandling } from '../utils/error_handling.js';
import userModal from './../../db/models/users_modal.js';
import { tokenDecode } from './../utils/tokenGeneration.js';






const auth = () => {
    return asyncHandling(async (req, res, next) => {

        const { auth } = req.headers

        if (!auth) return next(new Error("auth empty"))

        const decode = tokenDecode({ payload: auth })

        if (!decode?.id) return next(new Error("invalid  tokenDecode"))

        const user = await userModal.findById(decode.id).select("name email _id")
        if (!user) return next(new Error("not register account"))


        req.user = user


        return next()
    })
}
export default auth
