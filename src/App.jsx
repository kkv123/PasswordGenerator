import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(5);
  const [password, setPassword] = useState('kuldeep');
  const [includeChars, setIncludeChars] = useState(false);
  const [includeSpecialChar, setIncludeSpecialChar] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);


  let allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  specialChars += allChars
  let numbers = '0123456789';
  let allNotations = specialChars + numbers;
  numbers += allChars;

  // ----------------------useCallback to memoize the generatePassword function------------------
  const generatePassword = useCallback(() => {
    let ans = '';
    for (let i = 0; i < length; i++) {
      let char = '';
      if (includeSpecialChar && includeNumbers) {
        char = allNotations.charAt(Math.floor(Math.random() * (allNotations.length)));
      } else if (includeSpecialChar) {
        char = specialChars.charAt(Math.floor(Math.random() * (specialChars.length)));
      } else if (includeNumbers) {
        char = numbers.charAt(Math.floor(Math.random() * (numbers.length)));
      } else {
        char = allChars.charAt(Math.floor(Math.random() * (allChars.length)));
      }
      ans += char;
      setPassword(ans);
      // console.log(ans);
    }
  }, [length, includeChars, includeSpecialChar, includeNumbers]);
  console.log(password);

  // ------------------useEffect to auto-generate password whenever dependencies change------------------
  useEffect(() => {
    generatePassword(); // auto-run whenever dependencies change
  }, [generatePassword]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password);

    alert('Password copied to clipboard!');
  }, [password]);

  return (
    <>
      <div className='w-screen bg-gradient-to-r from-green-400 to-blue-500 h-screen flex justify-center'>
        
        <div className="text-center bg-green-500 text-olive kp-4 rounded-lg flex justify-center items-center w-[40%] h-[20%] flex-col font-Sans-serif text-xl text-shadow-lg shadow-black border-2 border-red-500 ">
          <label className='text-2xl font-bold'>Password Generator</label>

          <div className='w-[100%] flex justify-center items-center justify-items-center mt-2'>
            <input type="text" className="w-3/4 h-7 ml-3 p-1 rounded-lg text-black font-bold text-md" placeholder={password} readOnly />
            <button className="-ml-3 h-7 w-16 rounded-r-xl text-white bg-red-300 hover:bg-yellow-500" onClick={copyToClipboard}>Copy</button>
          </div>

          <div className='flex justify-center items-center font-normal flex-row mt-2  '>
            <div flex="row" className='flex justify-center items-center'>
              <input type="range"
                min={5} max={30} value={length} onChange={(e) => setLength(e.target.value)}
                className="ml-4 p-2 rounded-lg text-black w-20"
                placeholder="Length" />
              <label >Length : {length}</label>
            </div>

            <div>
              <input
                type="checkbox" className="ml-4 p-2 rounded-lg text-black" checked={includeChars}
                onChange={(e) => setIncludeChars(e.target.checked)} />
                <label> characters</label>
            </div>

            <div>
              <input
                type="checkbox"
                className="ml-4 p-2 rounded-lg text-black"
                checked={includeSpecialChar}
                onChange={(e) => setIncludeSpecialChar(e.target.checked)} />
                <label> specialchar</label>
             
            </div>

            <div>
              <input type="checkbox" className="ml-4 p-2 rounded-lg text-black" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} /> 
              <label> numbers</label>
            </div>


          </div>
        </div>
      </div>

    </>
  )
}

export default App
