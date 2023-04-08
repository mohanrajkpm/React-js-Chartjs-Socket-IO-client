import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js';
import BarChart from './components/bar_chart';
import LineChart from './components/line_chart';

Chart.register(CategoryScale);

function App() {
  
  const [data, setData] = useState({
    labels: [0],
    datasets: [
      {
        label: 'Users Profit',
        data: [0],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "&quot;#ecfof1",
          "#50AF95",
          "#f3ba2f",
          "#2a71do"
        ],
        boarderColor: 'black',
        borderwidth: 2
      }
    ]
  });

  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:4001/')
    socket.on('message', (data) =>{
    const chartData = {   labels: data.map((item) => item.year),
      datasets: [
        {
          label: 'Users Profit',
          data: data.map((item) => item.userGain),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "&quot;#ecfof1",
            "#50AF95",
            "#f3ba2f",
            "#2a71do"
          ],
          boarderColor: 'black',
          borderwidth: 2
        }
      ]
    }
    setData(chartData)
    });
  },[])

  
  return (
    <div className="App">
      <BarChart chartData={data} />
      <LineChart chartData={data} />
    </div>
  );
}

export default App;
