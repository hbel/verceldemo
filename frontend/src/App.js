import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const API = "https://helpful-onesies-fly.cyclic.app/api/test";

function App() {
  const [data, setData] = useState(); 

  useEffect(() => {
	fetch(API, {
		method: "GET",
		credentials: "include"
	}).then(res => res.json()).then(d => setData(d));
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
	  <div>
		<h2>Informationen aus dem Backend</h2>
		<p>Typ: {data?.type}</p>
		<p>Name: {data?.payload?.name}</p>
		<p>Count: {data?.payload?.count}</p>
	  </div>
    </div>
  );
}

export default App;
