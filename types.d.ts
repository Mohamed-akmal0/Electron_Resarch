type Statistics = {
  usuage: number;
  ramUsage: number;
  storageData: {
    total: number;
    usage: number;
  };
};

type StaticData = {
  totalStorageData: number;
  cpuModal: number;
  totalMemoryGB: number;
};

type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
};

type UnsubscirbeFunction = () => void;

interface Window {
  electron: {
    subscirbeStatistics: (callback: (statistics: Statistics) => void) => UnsubscirbeFunction;
    getStaticData: () => Promise<StaticData>;
  };
}
