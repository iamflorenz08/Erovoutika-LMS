
import { io } from "socket.io-client";
const SocketIO = io('http://localhost:5000', {
    autoConnect: false
})
export default SocketIO