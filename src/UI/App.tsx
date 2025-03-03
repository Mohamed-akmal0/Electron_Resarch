import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BaseChart } from "./BaseChart.js";
import { useStatistics } from "./useStatistics.js";
import { Chart } from "./Chart.js";

function App() {
  const [count, setCount] = useState(0);
  const [activeView, setActiveView] = useState("Cpu");

  const statistics = useStatistics(10);

  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.usuage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => stat.storageData),
    [statistics]
  );

  const acitveUsages = useMemo(() => {
    switch (activeView) {
      case "Cpu":
        return cpuUsages;
      case "Ram":
        return ramUsages;
      case "Storage":
        return storageUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages]);

  useEffect(() => {
    return window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

  return (
    <>
      <header>
        <button
          id="close"
          onClick={() => window.electron.sendFrameAction("CLOSE")}
        />
        <button
          id="minimise"
          onClick={() => window.electron.sendFrameAction("MINIMIZE")}
        />
        <button
          id="maxmize"
          onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
        />
      </header>
      <div className="App">
        <div style={{ height: 20 }}>
          <Chart data={acitveUsages} maxDataPoint={10} />
        </div>
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
