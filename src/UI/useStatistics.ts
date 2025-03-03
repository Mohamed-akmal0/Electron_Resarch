import { useEffect, useState } from "react";

export function useStatistics(dataPointCount: number) {
  const [value, setValue] = useState<Statistics[]>([]);

  useEffect(() => {
    const unSub = window.electron.subscirbeStatistics((stats) =>
      setValue((prev) => {
        const newData = [...prev, stats];
        if (newData.length > dataPointCount) {
          newData.shift();
        }
        return newData;
      })
    );
    return unSub;
  }, []);
  return value;
}
