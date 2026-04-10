import {io} from 'socket.io-client'
export const initializeSocketConnection = ()=>{
    const socket = io(import.meta.env.VITE_API_URL,{
        withCredentials:true
    })
    socket.on("connect",()=>{
        console.log("connected to Socketio.server hi")
    })

}