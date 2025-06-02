import React from 'react'
import { Link } from 'react-router-dom'


const Nav = () => {
  return (
    <div className='bg-orange-400 flex justify-between text-center text-white px-4 py-4'>
        <h1>vishal Raj</h1>
        <div className='flex gap-10 text-xl '>
            <Link to = '/about'>About</Link>
            <Link to = '/home'>Home</Link>
            <Link to = '/contact'>Contact</Link>
            <Link to = '/product'>product</Link>
        </div>
    </div>
  )
}

export default Nav