import { Chess } from "chess.js";

export  class Game{
    participant1;
    participant2;
    board;
    moves;

    constructor(participant1,participant2){
        this.participant1=participant1;
        this.participant2=participant2;
        this.board=new Chess();
        this.moves=[];
        this.participant1.send(
                        JSON.stringify({
                            type:"init_game",
                            payload:{
                                color:"w"
                           }
                        })
                    )
        this.participant2.send(
                        JSON.stringify({
                            type:"init_game",
                            payload:{
                               color: "b"
                            }
                        })
                    )
    }

    makeMove(socket,move){
       // move={to:"",from:""}
        if(this.moves.length%2==0 && socket==this.participant2) return;
        if(this.moves.length%2!=0 && socket==this.participant1) return;

        try {
            console.log(move);
            this.board.move(move)
            this.moves.push(move)
        } catch (error) {
            console.log(error,123);
        }

        if(this.board.isGameOver()){
            this.participant1.emit(JSON.stringify({
                type:"game_over",
            payload:"winner =="+move.length%2==0? "player1":"player2"}))
            this.participant2.emit(JSON.stringify({
                type:"game_over",
            payload:"winner =="+move.length%2==0? "player1":"player2"}))
        }

        if(this.moves.length%2==0){
            this.participant1.send(JSON.stringify({
                type:"move",
                payload:move,
            }))
        }
        if(this.moves.length%2!=0){
            this.participant2.send(JSON.stringify({
                type:"move",
                payload:move,
            }))
        }

    }
} 