import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { calculateMonthlyCompounding } from "./utils/interestCalculator.ts";

function App() {
  const [count, setCount] = useState(3);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Term Deposits</h1>
      <div className="card">
        <label>Deposit </label>
        <input type="number" />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {count} month(s)
        </button>
      </div>
      <div className="card">
        <p>Amount is: {calculateMonthlyCompounding(10000, 1.1, count)}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
