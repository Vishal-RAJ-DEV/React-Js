import React, { useState } from 'react'
import axios from 'axios'

const Getdata = () => {

  const [userdata, setdata] = useState([])
    const data= async() =>{
        const reponse = await axios.get('https://picsum.photos/v2/list');
        setdata(reponse.data);
        console.log(userdata);
        
        
        
    }
    
        
        
    
  return (
    <div className= "p-5">
        <button onClick={data} className = "bg-red-500 p-3 text-xl ">
            Get data
        </button>
        <div className =" text-white bg-green-600 p-5 mt-4">
          {userdata.map((ele,idx)=>{
            return <div key = {idx} className='w-full bg-white text-center flex px-7 py-6 justify-around mt-3'>
              <img className='h-40 w-50' src={ele.download_url}/>
              <h1 className='text-black' >{ele.author}</h1>
            </div>
          })}
            
        </div>
    </div>
  )
}

export default Getdata