import React, { useCallback, useEffect, useRef, useState } from 'react'


const Password = () => {
    const [length, setlenght] = useState(8);
    const [Password, setPassword] = useState("");
    const [numberAllowed, setnumberAllowed] = useState(false);
    const [charAllowed, setcharAllowed] = useState(false);
    const PassRef = useRef(null)

    const copyClipBoard = useCallback(
      () => {
        PassRef.current?.select()  //used to show that the password is selected 
        PassRef.current?.setSelectionRange(0,20)  //only 20 charcter can be selected 
        window.navigator.clipboard.writeText(Password);  //it copy the password to clipboard 
      },
      [Password] )
    
    const generate = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numberAllowed) str += "0123456789";
        if (charAllowed) str += "@#$%^&!";
        for (let i = 0; i <= length; i++) {
            const char = Math.floor(Math.random() * str.length + 1);

            pass += str.charAt(char);

        }
        setPassword(pass)

    }, [length, numberAllowed, charAllowed, setPassword])   //hese are dependiencies in which the generate password is depend 

    useEffect(() =>{
        generate();
    },[length, numberAllowed, charAllowed,generate])

    


    return (
        <div className='w-full max-w-md mx-auto shadow-md rounded-xl bg-gray-500 px-4 py-8 mt-30'>
            <h1 className='text-white text-center mb-2 text-2xl'>Password Generator</h1>
            <div className='flex overflow-hidden rounded-2xl mb-2 shadow'>
                <input type="text" className='w-full bg-amber-50 px-3 py-3 text-gray-400 outline-none ' placeholder='password' value={Password} readOnly ref={PassRef} />
                <button onClick={copyClipBoard} className='bg-blue-600 px-5 py-3 outline-none text-white'>Copy</button>
            </div>
            <div className='flex gap-x-2'>
                <div className='flex gap-x-1'>
                    <input className='cursor-pointer' type="range" max={100} min={8} value={length} onChange={(e) => setlenght(e.target.value)} />
                    <label>Length: {length}</label>
                </div>
                <div className='flex gap-x-2'>
                    <input
                        type="checkbox"
                        defaultChecked={numberAllowed}
                        id='numberAllowed'
                        onChange={() => {setnumberAllowed((prev) => !prev)}} /> 
                    <label htmlFor="numberAllowed">Numbers</label>
                </div>
                <div className='flex gap-x-1'>
                    <input type="checkbox"
                    defaultChecked = {charAllowed}
                    id = 'charAllowed'
                    onChange={()=>{setcharAllowed((prev) => !prev)}} />
                </div>
                <label htmlFor="charAllowed">character</label>
            </div>



        </div>
    )
}

export default Password