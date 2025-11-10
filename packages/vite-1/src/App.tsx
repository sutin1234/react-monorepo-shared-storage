import { useEffect, useRef, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

declare global {
  interface Window {
    sharedStorage?: {
      set: (key: string, value: string, options?: { ignoreIfPresent?: boolean }) => void;
    };
  }
}

function App() {
  const [count, setCount] = useState(0)
  const inputRef = useRef<HTMLIFrameElement>(null)

  function gotoApp2() {

    const wind = inputRef.current?.contentWindow
    console.log('iframe contentWindow:', wind);
    wind?.postMessage({ type: 'setItem', key: 'token', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30' }, '*');
    wind?.postMessage({ type: 'getItem', key: 'token' }, '*');
    window.location.href = 'http://localhost:5174';
  }


  useEffect(() => {
    window.addEventListener('message', (event) => {
      const { type, key, value } = event.data;
      // if (type === 'getItem' && key && value) {
      //   console.log(`getItem from localStorage: ${key} = ${value}`);
      // }
      if (type === 'getItemResponse' && key && value) {
        console.log(`getItemResponse from localStorage: ${key} = ${value}`);
      }
    })
  }, []);

  return (
    <>
      <iframe ref={inputRef} id="iframe" src="http://localhost:5174/iframe.html" style={{ display: 'none' }} title="app1-iframe"></iframe>
      <div>
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
        <button onClick={gotoApp2}>
          goto app2
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
