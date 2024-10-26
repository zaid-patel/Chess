import {WebSocket} from "ws";
import { Game } from "./Game.js";

export class GameManager{
    games;
    users;
    pendingUser;


    constructor(){
        this.games=[]
        this.pendingUser=null;
        this.users=[];
    }


    addUser(socket){
       this.users.push(socket)
    //    console.log("yike");
       this.addHandler(socket)
    //    console.log("yike2");

    }

    removeUser(socket){
        this.users=this.users.filter(user=>user!==socket)
    }


    addHandler(socket){
        

        socket.on("message",(data)=>{
            const message=JSON.parse(data.toString());

            // console.log(12);
            if(message?.type=="init_game"){
                if(this.pendingUser){
                    const game=new Game(this.pendingUser,socket)
                    console.log("hakuna matata");
                    this.pendingUser=null;
                    this.games.push(game)
                }
                else{
                    this.pendingUser=socket
                    console.log(1234)
                }
            }

            else if(message.type=='move'){
                const game=this.games.find(game =>(game.participant1===socket || game.participant2===socket))
                // console.log(game);
                game?.makeMove(socket,message.move)
            }
        })
    }



}