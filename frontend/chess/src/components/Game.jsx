import React, { useEffect } from 'react'
import { Chess } from 'chess.js';
import { useState } from 'react';
import { Chessboard } from "react-chessboard";
import { useSocket } from '../hooks/useSocket';
   
    
    function Game() {
        const [game, setGame] = useState(new Chess());
        const [fen,setFen]=useState(game.fen())
        const socket=useSocket();
        const [playing,setPlaying]=useState(false)
        const [searching,setSearching]=useState(false)
        const [move,setMove]=useState(null)
        const [myColor,setMycolor]=useState(null)
        const play=()=>{
           const res= socket.send(JSON.stringify({
                type:"init_game"
        }))
        //   console.log(res);
        // if(res) setPlaying(true)
          setSearching(true)

           
        }
        

        const message=useEffect(()=>{
            console.log(1111);
            if(!socket) return ;
            socket.onmessage=(event)=>{
                const message=JSON.parse(event.data)
                console.log(message);
               if(message.type=="init_game") {
                console.log("game ");
                setSearching(false)
                setPlaying(true)
                setMycolor(message.payload.color)
               }
               if(message.type=="move") {
                console.log("move made",message);
                // if(move==message) return ;
                console.log("1xx1");
            const move = makeAMove({
                from: message.payload.from,
                to: message.payload.to,
                promotion: "q", // always promote to a queen for example simplicity
              });
           
            // const res=socket.send(JSON.stringify({
            //     type:"move",
            //     move:{
            //     from:sourceSquare,
            //     to:targetSquare,
            //     }
            // }))
            // console.log(res);
            // if(res!=undefined){
              
            // }
            // // illegal move
            // if (res===null) return false;
            // // setTimeout(makeRandomMove, 200);
            // return true;
                

               }
               if(message.type=="game_over") {
                console.log("game over",message.winner);
                setPlaying(false)
               }

            }
        },[socket])



        function makeAMove(move) {
            // console.log(move);
          const gameCopy = { ...game };
        //   console.log(gameCopy);
          const result = game.move(move);
        //   setGame(gameCopy);
        //   game
          setFen(game.fen())
          return result; // null if the move was illegal, the move object if the move was legal
        }
        function onDrop(sourceSquare, targetSquare) {
            console.log("1xx1");
            if(game.get(sourceSquare).color!=myColor) return;
            const move = makeAMove({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", // always promote to a queen for example simplicity
              });
           
            const res=socket.send(JSON.stringify({
                type:"move",
                move:{
                from:sourceSquare,
                to:targetSquare,
                }
            }))
            console.log(res);
            // if(res!=undefined){
              
            // }
            // illegal move
            if (res===null) return false;
            // setTimeout(makeRandomMove, 200);
            return true;
          }
          if(!socket) return <div>connecting...</div>
          
      return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Play Chess</h1>
          {/* <div className=" p-6 shadow-lg rounded-lg"> */}
            <Chessboard
              id="basic-board"
              width={50}
              height={50}
              arePremovesAllowed={true}
              boardOrientation={myColor=='b'?"black":"white"}
              position={game.fen()} onPieceDrop={onDrop}
            />
              <div>

                {!playing && !searching &&  <button onClick={play} className='bg-green-400 m-3 p-4'>Play</button>}
                {searching && <div>searching</div>}
              </div>
          </div>
        
          
        // </div>
      );
    }
    
    export default Game;
 