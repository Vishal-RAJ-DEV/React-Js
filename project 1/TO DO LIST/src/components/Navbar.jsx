import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='bg-blue-800 text-center text-white py-3 px-10 flex justify-between items-center '>
            <div className='text-2xl font-medium text-center'>
                <h1>ItASK </h1>
            </div>
            <div>
                <ul className='flex gap-4 text-xl '>
                    <li className='cursor-pointer hover:font-bold  transition-all'>Home</li>
                    <li className='cursor-pointer hover:font-bold  transition-all'>Your Task</li>
                </ul>
            </div>
        </nav>
    </div>
  )
} 

export default Navbar