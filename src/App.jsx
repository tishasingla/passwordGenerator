import { useState, useCallback,useEffect,useRef } from 'react'

// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, SetPassword] = useState("")
  // const passwordGenerator=useCallback(fn,[dependencies])
  // Call useCallback at the top level of your component to cache a function definition between re-renders:
  //useRef hook
  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@~#$%^&*{}|<>[]"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    SetPassword(pass)

  }, [length, numberAllowed, charAllowed, SetPassword])
  const copyPasswordtoClipboard=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  },[password])
  useEffect(()=>{
    passwordGenerator()

  },[length,numberAllowed,charAllowed,passwordGenerator])
  //useeffect is responsible for running the function password generator
  //whereas useCallback is responsible for optimising the function


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg bg-gray-700 text-orange-600 px-4 py-3 my-8'>
        <h1 className='text-white text-center pb-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4' >
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          ></input>
          <button
          onClick={copyPasswordtoClipboard} className='outline-none cursor-pointer bg-blue-900 text-white px-3 py-1 text-center shrink-0'>Copy</button>

        </div>
        <div className='flex text-base gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charInput">Character</label>
          </div>




        </div>
      </div>
    </>
  )
}

export default App
