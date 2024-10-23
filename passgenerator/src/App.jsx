import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  // Hooks useState------->

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef Hook------->
  const passwordRef = useRef(null)



  // Hooks useCallback function ------->
  // const passwordGenerator = useCallback(fn, [])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str =           "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*(){}[]" 

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
 1     
    }
    setPassword(pass)

  }
    
    , [length, numberAllowed, charAllowed, setPassword])
        
        
    const copyPasswordToClipboard = useCallback(() => {
      //Copy clip-----
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
      
    }, [password])



    useEffect(() => {
      passwordGenerator()
    }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className='w-full bg-gray-700 max-w-md mx-auto shadow-md rounded-lg px-4 my-8 pb-2 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

    <input type="text" 
    value={password}
    className='outline-none w-full py-1 px-3'
    readOnly
    ref={passwordRef}
    />

    <button 
    onClick={copyPasswordToClipboard}
    className='bg-blue-700 text-white px-3 py-0.5 shrink-0'
    >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
    <input 
    type="range" 
    min={5}
    max={20}
    value={length}
    className='cursor-pointer'
    onChange={(e) => {setLength(e.target.value)}}
    />
    <label>Length: {length}</label>
      
      <div className="flex item-center gap-x-1">
        <input type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={() => {
          setNumberAllowed((prev) => !prev);
        }}
        />
        <label htmlFor="numberInput">Numbers</label>
       </div>
        <div className="flex item-center gap-x-1">
        <input type="checkbox"
        defaultChecked={charAllowed}
        id="characterInput"
        onChange={() => {
          setCharAllowed((prev) => !prev);
        }}
        />
        <label htmlFor="characterInput">Charecters</label>
        </div>
      </div>
    </div>
  )
}

export default App
