type Statistics = {
  usuage: number;
  ramUsage: number;
  storageData: number;
};

type StaticData = {
  totalStorageData: number;
  cpuModal: number;
  totalMemoryGB: number;
};

type View = "Cpu" | "Ram" | "Storage";

type FrameWindowAction = "CLOSE" | "MAXIMIZE" | "MINIMIZE";

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: View;
  sendFrameAction: FrameWindowAction;
};

type UnsubscirbeFunction = () => void;

interface Window {
  electron: {
    subscirbeStatistics: (
      callback: (statistics: Statistics) => void
    ) => UnsubscirbeFunction;
    getStaticData: () => Promise<StaticData>;
    subscribeChangeView: (
      callback: (view: View) => void
    ) => UnsubscirbeFunction;
    sendFrameAction: (payload: FrameWindowAction) => Void;
  };
}
