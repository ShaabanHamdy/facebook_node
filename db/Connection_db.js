import mongoose from "mongoose"

const Connection_db = async () => {
    return await mongoose.connect(process.env.CONNECTION_DB)
        .then((res) => console.log("Connection_DB is Running"))
        .catch((err) => console.log({ message: "fail in Connection_DB", err }))

}



export default Connection_db



