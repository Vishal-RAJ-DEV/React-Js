import React, { useState } from 'react'

const BGchanger = () => {
    const [color, setcolor] = useState("black")
  return (
    <div className='w-full h-screen' style={{backgroundColor: color}}>
        <div className='fixed flex flex-wrap inset-x-0 px-2 bottom-12 justify-center'>
            <div className='flex flex-warp  px-3 py-1 justify-center rounded-2xl bg-amber-50'>
              <button onClick={()=> setcolor("red")} className='px-4 py-2  rounded-2xl outline-none mx-2 shadow-xl'  style={{backgroundColor:"red"}}>
                Red
              </button>
              <button onClick={()=> setcolor("green")} className='px-4 py-2  rounded-2xl outline-none mx-2 shadow-xl'  style={{backgroundColor:"green"}}>
                green
              </button>
              <button onClick={()=> setcolor("blue")} className='px-4 py-2  rounded-2xl outline-none mx-2 shadow-xl'  style={{backgroundColor:"blue"}}>
                blue
              </button>
              <button onClick={()=> setcolor("yellow")} className='px-4 py-2  rounded-2xl outline-none mx-2 shadow-xl'  style={{backgroundColor:"yellow"}}>
                yellow
              </button>
              <button onClick={()=> setcolor("orange")} className='px-4 py-2  rounded-2xl outline-none mx-2 shadow-xl'  style={{backgroundColor:"orange"}}>
                orange
              </button>
              <button onClick={()=> setcolor("pink")} className='px-4 py-2  rounded-2xl outline-none mx-2 shadow-xl'  style={{backgroundColor:"pink"}}>
                pink
              </button>
            </div>
        </div>
    </div>
  )
}

export default BGchanger