import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import BarChart from '../BarChart';

const colors = {
  chartBlue:'#4286F5',
  chartRed:'#DC4437',
  chartYellow:'#F5B400'
}


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Bar Chart',
    headerStyle: { backgroundColor: '#E75604',borderBottomWidth: 0 },
    headerTitleStyle: { color: '#FFF' },
  }

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
      selected: null,
    	 axis: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN'],
    }

    let count = [
      0,
      0,
      0,
    ];

    chart.values.forEach((data,index) => {
        data.forEach((elem) => {
            count[index] += elem;
        });
    });

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

  render() {

    const {chart,count} = this.state;
    const labels = count.map((elem, index) => {
        let value = elem;
        let color = {color : chart.colors.labelsColor[index]};
        let borderColor = {borderColor : chart.colors.labelsColor[index]};
        let border = {};
        if(index==1){
          border= {borderLeftWidth : 0.5,borderRightWidth : 0.5};
        }
        if(chart.selected != null)
          value = chart.values[index][chart.selected];

        return (
          <View key={index} style={[styles.listItemRow,border]}>
            <Text style={[styles.listItemRowTextTitle,color]}>{chart.labels[index]}</Text>
            <View style={[styles.listItemRowSeparator,borderColor]}></View>
            <Text style={[styles.listItemRowTextValue]}>{value} €</Text>
          </View>
        )
      })

    let subtitle = "FROM " + chart.axis[0] + " TO " + chart.axis[chart.axis.length-1];
    let buttonRemoveSelected = null;
    if(chart.selected != null){
      subtitle = "IN " + chart.axis[chart.selected];
    }

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <BarChart selected={this.state.barSelected} onPressItem={this.selectChart} height={180} chart={chart} />
          <View style={[styles.listSubtitle]}>
            <Text style={[styles.listSubtitleText]}>{subtitle}</Text>
          </View>
          <View style={[styles.listItemColumn]}>
            {labels}
          </View>
        </View>
        <View style={[styles.listSubtitle]}>
          <Text style={[styles.listSubtitleText]}>If you need support, or business inquiry contact-me :</Text>
        </View>
        <View style={[styles.listSubtitle]}>
          <Text style={[styles.listSubtitleText]}>@JulienKermarec - contact@julienkermarec.com</Text>
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    card: {
      borderRadius : 0,
      borderWidth : 0.5,
      borderColor: 'lightgray',
      backgroundColor : '#FFF',
      margin: 8,
    },
    listHeaderText: {
      fontSize: 16,
    },
    listHeader: {
      display: 'flex',
      paddingTop: 10,
      paddingBottom: 20,
      paddingLeft: 15,
      paddingBottom: 10,
      borderBottomWidth:0.5,
      borderColor:'lightgray',
    },
    listSubtitle: {
  	  display: 'flex',
      paddingTop: 8,
      paddingBottom: 20,
      paddingLeft: 15,
      paddingBottom: 8,
      borderTopWidth:0.5,
      borderColor:'lightgray',
      flexDirection: 'row',
    },
    listSubtitleText: {
      fontSize: 13,
      textAlign: 'center',
      flex: 1,
    },
    listItemColumn: {
      borderTopWidth:0.5,
      borderColor:'lightgray',
      display: 'flex',
      flexDirection: 'row',
    },
    listItemRow: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      borderColor: 'lightgray',
      borderBottomWidth: 0.5,
    },
    listItemRowTextTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
      paddingTop: 3,
      paddingBottom: 3,
    },
    listItemRowSeparator: {
      borderTopWidth: 2,
    },
    listItemRowTextValue: {
      textAlign: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: 14,
    },
  });
