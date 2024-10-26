import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';

function Landing() {
    const navigate=useNavigate();
    const play=()=>{
       
        navigate('/game')
    }

   

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <header className="text-center py-10">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to ChessMaster</h1>
            <p className="text-xl text-gray-600">Play, Learn, and Master the Game of Chess</p>
            <button onClick={play} className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
              Get Started
            </button>
          </header>
          <main className="w-full max-w-lg p-4 bg-white shadow-lg rounded-lg">
            {/* <img src={ChessBoard} alt="Chess Board" className="w-full h-auto" /> */}
          </main>
        </div>
      );
}

export default Landing
