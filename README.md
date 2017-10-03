# react-native-bar-chart

![Screenshot](https://raw.githubusercontent.com/julienkermarec/react-native-bar-chart/master/screenshots/small.png)

## Demo

https://expo.io/@julienkermarec/react-native-bar-chart

![Screenshot](https://raw.githubusercontent.com/julienkermarec/react-native-bar-chart/master/screenshots/expo.png)

## Tutoriel

https://blog.julienkermarec.com/bar-chart-en-react-native/

## Example

You can have POSITIVE OR/AND NEGATIVE values
You can have ONE values, or TEN values, automatically responsive
You can CLICK on a value to see details

![Screenshot](https://raw.githubusercontent.com/julienkermarec/react-native-bar-chart/master/screenshots/full.png)

## Usage
```javascript
import React, { StyleSheet, View, Component } from 'react-native';
import BarChart from '../BarChart';


const colors = {
  chartBlue:'#4286F5',
  chartRed:'#DC4437',
  chartYellow:'#F5B400'
}


class ScreenBarChart extends Component {

  constructor(props) {
    super(props);
    var chart = {
      values: [
        [0,10, 20, 30, 40],
        [100, 90, 80, 70, 60],
        [-100, -75, -50, -25, 0]
      ],
      colors: {
        labelsColor : ['#4286F5', '#DC4437', '#F5B400'],
        axisColor : 'rgba(216, 216, 216, 1)',
      },
      labels: ['LABEL A', 'LABEL B', 'LABEL C'],
      selected: 2,
    	 axis: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN'],
    }

    this.state = {
      chart : chart,
      count: count,
    }

    this.selectChart = this.selectChart.bind(this);
  }

  selectChart(index) {
    let chart = this.state.chart;
    chart["selected"] = index;
    this.setState({chart:chart});
  }
  removeSelected(){
    let chart = this.state.chart;
    chart["selected"] = null
    this.setState({chart:chart});
  }

  render(){
    <BarChart selected={this.state.barSelected} onPressItem={this.selectChart} height={180} chart={chart} />
  }
}

```

## TODO
- [X] V1 bar chart
- [ ] Add horizontal axis (min/max)
- [ ] Add bar char to npm
- [ ] Horizontal scroll for infinite bars

## Info/Support

If you need support, or business inquiry contact-me :

@JulienKermarec - contact@julienkermarec.com
