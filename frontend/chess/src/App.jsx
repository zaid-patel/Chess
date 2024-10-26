import { useState } from 'react'
import './App.css'
import Game from './components/Game'
import Landing from './components/Landing'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter basename='/app'>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/game" element={<Game />} />

          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
