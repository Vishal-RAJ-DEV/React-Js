import React from 'react'

const Card = (user) => {
    
    
  return (
    <div className='bg-white py-5 px-7 text-2xl rounded text-black  m-5 text-center inline-block'>
        <img className='w-32 h-32 rounded-full mb-1' src={user.photo}  />
        <h1 className='text-2xl font-semibold mb-2'>{user.username}</h1>
        <h1>{user.work}</h1>
        <h1 class="text-blue-600"> {user.city},{user.age} </h1>
        <button className='bg-green-800 rounded text-white px-3 py-3 font-medium mt-3 '>Add Friend</button>

    </div>
  )
}

export default Card