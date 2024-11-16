// ===================== imports ============================================================================
import cors from 'cors';
import { Server } from 'socket.io';
import Connection_db from '../../db/Connection_db.js';
import * as appRoutes from "../modules/app_routes.js";
import globalErrorHandling from './error_handling.js';

const App = (express) => {
    const app = express()
    app.use(cors())
    // =================================================================================================
    app.use(express.json({}))
    const port = process.env.PORT || 5000
    Connection_db()
    // =========================================== Routes ===============================================
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use("/uploads", express.static("uploads"))
    app.use('/user', appRoutes.userRouter)
    app.use('/post', appRoutes.postRouter)
    // =========================================== global error handling  ===============================================
    app.use(globalErrorHandling)
    // =========================================== app listen ===============================================
    let myServer = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    // =========================================== Socket io  ===============================================
    const io = new Server(myServer, {
        cors: {
            origin: ["http://localhost:3000"],
            methods: ["GET", "POST"]
        }
    })
    
    SocketIo (io)
}

export  function SocketIo (io){
    // io.on("connection", (socket) => {
    //     console.log("user connected", socket.id);
    //     socket.on("addFriend",(data)=>{
    //         console.log(data);
    //         // socket.emit("reply" , data + "  from backend")
    //     })
    //     })
    return io
}



export default App


    // let userSocketMao = {}

        
        
        
        
        
        
        
        
        
        // const userId = socket.handshake.query.userId
        // console.log("user connected",userId);
        // if (userId !== undefined) {
        //     // userSocketMao[userId]
        //     // console.log(userSocketMao);
        // }
        
        
        
        // if (userId === undefined) {
            //     return userSocketMao[userId] = socket.id
            // }
            // io.emit("getOnlineUsers",Object.keys(userSocketMao))
            // socket.on("disconnected", () => {
                //     console.log("user disconnected", socket.id);
                //     delete userSocketMao[userId]
                //     io.emit("getOnlineUsers",Object.keys(userSocketMao))
                
                // })
            // })