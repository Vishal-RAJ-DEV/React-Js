import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { increment,decrement } from './redux/counter/counterSlice'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <Navbar />
      <div>
        <button onClick={()=>{dispatch(increment())}}>+</button>
        <p>the number is derecising {count}</p>
        <button onClick={()=>{dispatch(decrement())}}>-</button>
      </div>


    </>
  )
}

export default App
