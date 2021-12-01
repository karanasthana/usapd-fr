import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import StateSelect from '../Components/stateSelect';

export default class LineChartGraph extends Component {
  
  state = {
    data: {
      labels: [],
      datasets: [],
    }
  }

  componentDidMount = () => {
    let data = {
      labels: ['1', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          yAxisID: 'y-axis-1',
        },
        {
          label: '# of No Votes 2',
          data: [1, 2, 1, 1, 2, 2],
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
          yAxisID: 'y-axis-2',
        },
        {
          label: '# Random',
          data: [121, 221, 141, 431, 242, 552],
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
          yAxisID: 'y-axis-3',
        },
      ],
    };

    let options = {
      scales: {
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              drawOnArea: false,
            },
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-3',
            gridLines: {
              drawOnArea: false,
            },
          },
        ],
      },
    };

    this.setState({ data, options })
  }

  render = () => {
    debugger;
    return <>
      <div className='header'>
        <h1 className='title'>{this.props.title}</h1>
        <div>
          <StateSelect />
        </div>
        <div className='links'>
          <a
            className='btn btn-gh'
            href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/MultiAxisLine.js'
          >
            Github Source
          </a>
        </div>
      </div>
      <Line data={this.state.data} options={this.state.options} />
    </>
  }
}