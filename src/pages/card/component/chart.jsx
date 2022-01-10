import React, { useState, useRef, useEffect} from 'react';
import { Line } from '@ant-design/charts';

// const data = [
//   {
//     year: '1991',
//     value: 3,
//   },
//   {
//     year: '1992',
//     value: 4,
//   },
//   {
//     year: '1993',
//     value: 3.5,
//   },
//   {
//     year: '1994',
//     value: 5,
//   },
//   {
//     year: '1995',
//     value: 4.9,
//   },
//   {
//     year: '1996',
//     value: 6,
//   },
//   {
//     year: '1997',
//     value: 7,
//   },
//   {
//     year: '1998',
//     value: 9,
//   },
//   {
//     year: '1999',
//     value: 13,
//   },
// ];

const Chart = (params) => {
  console.log(params)
  const {data = []} = params
  // const [chartData,setChartData] = useState([]);

  useEffect(()=>{
    // if(data) setChartData(data)
    // else setChartData([{item:"0",tiem:"0"}])
    console.log("@@@")
  },[params])

  const config = {
    data,
    xField: 'time',
    height:200,
    yField: 'item',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
  };
  return (
      <Line style={{marginBottom:"24px"}} {...config} />
  );
};

export default Chart;
