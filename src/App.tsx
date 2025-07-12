import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { calculateMonthlyCompounding } from "./features/savingsAndDepositCalculator/compoundingInterestCalculators.ts";
import { createAnnualInterestRate } from "./features/savingsAndDepositCalculator/annualInterestRate.factory.ts";
import { createDurationMonths } from "./features/savingsAndDepositCalculator/durationMonths.factory.ts";

function App() {
  const [annualRate, setAnnualRate] = useState<number>(1.2);
  const [principal, setPrincipal] = useState<number>(10000);
  const [months, setMonths] = useState(3);

  const handleAnnualRateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAnnualRate(parseFloat(event.target.value));
  };
  const handlePrincipalChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPrincipal(parseFloat(event.target.value));
  };
  const handleInvestmentTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMonths(parseInt(event.target.value));
  };

  useEffect(() => {
    calculateMonthlyCompounding(
      principal,
      createAnnualInterestRate(annualRate),
      createDurationMonths(months),
    );
  }, [annualRate, principal, months]);

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
        <label>Interest Rate </label>
        <input
          type="number"
          value={annualRate}
          onChange={handleAnnualRateChange}
        />
      </div>
      <div className="card">
        <label>Deposit </label>
        <input
          type="number"
          value={principal}
          onChange={handlePrincipalChange}
        />
      </div>
      <div className="card">
        <label>Investment Term </label>
        <input
          type="number"
          value={months}
          onChange={handleInvestmentTermChange}
        />
      </div>
      <div className="card">
        <table>
          <thead>
            <th>Month</th>
            <th>Interest Rate</th>
            <th>Interest earned</th>
            <th>Balance</th>
          </thead>
          <tbody>
            {calculateMonthlyCompounding(
              principal,
              createAnnualInterestRate(annualRate),
              createDurationMonths(months),
            ).map(({ month, annualRate, interest, balance }, index) => (
              <tr>
                <td>{month}</td>
                <td>{annualRate.toFixed(2)}%</td>
                <td>${interest.toFixed(2)}</td>
                <td>${balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
