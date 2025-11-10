import { useEffect, useRef, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)
  const inputRef = useRef<HTMLIFrameElement>(null)
  const responseRef = useRef<number>(0)


  function gotoApp1() {
    window.location.href = 'http://localhost:5173';
  }

  useEffect(() => {

    setTimeout(() => {
      const wind = inputRef.current?.contentWindow
      console.log('iframe contentWindow:', wind);
      wind?.postMessage({ type: 'getItem', key: 'token' }, '*');
    }, 1000);
    window.addEventListener('message', (event) => {
      const { type, key, value } = event.data;
      // if (type === 'getItem' && key && value) {
      //   console.log(`getItem from localStorage: ${key} = ${value}`);
      // }
      if (type === 'getItemResponse' && key && value && responseRef.current === 0) {
        console.log(`getItemResponse from localStorage: ${key} = ${value}`);
        responseRef.current = 1;
      }
    })
  }, []);




  return (
    <>
      <div>
        <iframe ref={inputRef} id="iframe" src="/iframe.html" style={{ display: 'none' }} title="app1-iframe"></iframe>

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={gotoApp1}>
          goto app1
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
