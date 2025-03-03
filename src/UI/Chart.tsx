import { useMemo } from "react";
import { BaseChart } from "./BaseChart.js";

type chartProps = {
  data: number[];
  maxDataPoint: number;
};

export function Chart(props: chartProps) {
  console.log('chat data', props.data);
  
  const modifiedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));

    return [
      ...points,
      ...Array.from({ length: props.maxDataPoint - points.length }).map(() => {
        return { value: undefined };
      }),
    ];
  }, []);

  return <BaseChart data={modifiedData} fill="#0A4D5C" stroke="#5DD4EE" />;
}
