import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useStatistics } from "./useStatistics.js";
import { Chart } from "./Chart.js";
import { Header } from "./Header.js";

function App() {
  const [activeView, setActiveView] = useState<View>("Cpu");

  const statistics = useStatistics(10);
  console.log('statistics', statistics);
  
  const staticData = useStaticData();

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

  // console.log(staticData);

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
    <div className="App">
      <Header />
          <h3 style={{ textAlign:"center"}} >My System Resource graph</h3>
      <div className="main">
        <div>
          <SelectOption
            onClick={() => setActiveView("Cpu")}
            title="CPU"
            view="Cpu"
            subTitle={staticData?.cpuModal ?? ""}
            data={cpuUsages}
          />
          <SelectOption
            onClick={() => setActiveView("Ram")}
            title="RAM"
            view="Ram"
            subTitle={(staticData?.totalMemoryGB.toString() ?? "") + " GB"}
            data={ramUsages}
          />
          <SelectOption
            onClick={() => setActiveView("Storage")}
            title="STORAGE"
            view="Storage"
            subTitle={(staticData?.totalStorageData.toString() ?? "") + " GB"}
            data={storageUsages}
          />
        </div>
        <div className="mainGrid">
          <Chart
            selectedView={activeView}
            data={acitveUsages}
            maxDataPoint={10}
          />
        </div>
      </div>
    </div>
  );
}

function SelectOption(props: {
  title: string;
  view: View;
  subTitle: string | number;
  data: number[];
  onClick: () => void;
}) {
  return (
    <button className="selectOption" onClick={props.onClick}>
      <div className="selectOptionTitle">
        <div>{props.title}</div>
        <div>{props.subTitle}</div>
      </div>
      <div className="selectOptionChart">
        <Chart selectedView={props.view} data={props.data} maxDataPoint={10} />
      </div>
    </button>
  );
}

function useStaticData() {
  const [staticData, setStaticData] = useState<StaticData | null>(null);

  useEffect(() => {
    (async () => {
      setStaticData(await window.electron.getStaticData());
    })();
  }, []);

  return staticData;
}

export default App;
