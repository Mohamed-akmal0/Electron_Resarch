import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BaseChart } from "./BaseChart.js";
import { useStatistics } from "./useStatistics.js";
import { Chart } from "./Chart.js";

function App() {
  const [count, setCount] = useState(0);

  const statistics = useStatistics(10);
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.usuage),
    [statistics]
  );

  console.log('statistics ', cpuUsages);
  

  return (
    <>
        <div className="App">
          <div style={{ height: 20 }}>
            <Chart data={cpuUsages} maxDataPoint={10} />
          </div>
        </div>
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
          count check is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
