import multer from "multer";
import { nanoid } from "nanoid";
import SharpMulter from "sharp-multer";

// ===========================================================
const validationObject = {
    image: ['image/png', 'image/jpeg', 'image/gif'],
    files: ['application/pdf']
}
export const myMulter = () => {

    const storage = SharpMulter({
        destination: (req, file, callback) => {
            callback(null, "uploads")
        },
        filename: (req, file, cb) => {
            return `${nanoid(4)}--` + req
        },
        imageOptions: {
            // quality: 80,
            // resize: { width: 800, height: 800 },
        },

    });

    const fileFilter = (req, file, cb) => {
        if (validationObject.image.includes(file.mimetype)) {
            return cb(null, true)
        }
        cb(Error("invalid image extension", { cause: 400 }), false)
    }

    //==============================================================================
    const upload = multer({ fileFilter, storage })
    return upload
}


// ==================================================================












