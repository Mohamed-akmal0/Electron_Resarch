import { useMemo } from "react";
import { BaseChart } from "./BaseChart.js";

type chartProps = {
  data: number[];
  maxDataPoint: number;
  selectedView: 'Cpu' | 'Ram' | 'Storage';
};

export const COLOR_MAP = {
  Cpu: {
    stroke: '#5DD4EE',
    fill: '#0A4D5C',
  },
  Ram: {
    stroke: '#E99311',
    fill: '#5F3C07',
  },
  Storage: {
    stroke: '#1ACF4D',
    fill: '#0B5B22',
  },
};

export function Chart(props: chartProps) {
  const color = useMemo(
    () => COLOR_MAP[props.selectedView],
    [props.selectedView]
  );
  console.log('color',color);
  
  const modifiedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: props.maxDataPoint - points.length }).map(
        () => ({ value: undefined })
      ),
    ];
  }, [props.data, props.maxDataPoint]);

  return <BaseChart data={modifiedData} fill={color !== undefined && color.fill} stroke={color !== undefined && color.stroke} />;
}
