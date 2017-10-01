import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

const colors = {
  chartBlue:'#4286F5',
  chartRed:'#DC4437',
  chartYellow:'#F5B400'
}

export default class BarChart extends Component {


  constructor(props) {
    super(props);
    const {
        width,
        height,
        chart,
    } = this.props;


    this.state = {
        minValue: 0,
        maxValue: 0,
        variation: 0,
        stepX: 0,
        stepY: 0,
        width: width,
        height: height,
        values: chart.values,
        colors: chart.colors,
        length: chart.axis.length,
        axis: chart.axis,
        horizontalLines: []
    };
    this.buildChart();
  }


  buildChart(){
    const {values, width, height, margin, length} = this.state;
    let min = 0;
    let max = 0;
    let variation = 0;
    let marginBottom = 0;
    values.forEach((section) => {
      section.forEach((bar) => {
        if(bar < min)
          min = bar;
        if(bar > max)
          max = bar;
      })
    })
    this.state.minValue = min;
    this.state.maxValue = max;
    if(min < 0)
      min = (min*-1);

    variation = min + max;
    this.state.variation = variation;
    this.state.height = height-50;
    marginBottom = ((Math.abs(this.state.min) / this.state.variation)*this.state.height);
    this.state.marginBottom = marginBottom;
  }

   calcHeight(value: number): any {
    // TODO: Math.round??
    if(value>=0){
      let height = Math.abs(value) / this.state.variation;
      return  { height:  height*this.state.height};
    }
    else {
    let height = Math.abs(value) / this.state.variation;
      return  {
        height:height*this.state.height,
        bottom: -(height*this.state.height),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
       };
     }
  }

  setHeight(){
    return { height: this.props.height};
  }

  calcMin(): any {
    if(this.state.minValue < 0)
      return  { paddingBottom: (Math.abs(this.state.minValue) / this.state.variation)*this.state.height};
    else
      return {};
  }

  styleContainer(index){
    const {length} = this.state;
    const {chart} = this.props;
    let borderLeftWidth = 0;
    let paddingLeft = 20;
    let paddingRight = 20;
    let backgroundColor = "white";
    if(chart.selected == index){
      backgroundColor = '#FAF9FA';
    }

    if(index != 0)
      borderLeftWidth = 0.5;

    if(length > 3){
      paddingLeft = 2;
      paddingRight = 2;
    }
    return  {
      backgroundColor: backgroundColor,
      borderLeftWidth: borderLeftWidth,
      paddingRight: paddingRight,
      paddingLeft: paddingLeft-2,
    };

   }
  render() {

    const {
        width,
        height,
        minValue,
        maxValue,
        variation,
        values,
        stepX,
        stepY,
        length,
        axis,
        margin,
        labelWidth,
        horizontalLines,
        colors,
    } = this.state;

    const bars = values[0].map((p, i) => {
      return (
      <TouchableHighlight key={i} underlayColor='rgba(240,240,240,1)' onPressIn={() => this.props.onPressItem(i)} onPressOut={() => this.props.onPressItem(null)} style={[styles.barBoxButton]}>
        <View style={[styles.barBoxContainer, this.styleContainer(i)]}>
          <View style={[styles.barBox,this.calcMin()]}>
            <View style={[styles.bar, styles.barPast,this.calcHeight(values[0][i])]} />
            <View style={[styles.bar, styles.barReal, this.calcHeight(values[1][i])]} />
            <View style={[styles.bar, styles.barFuture, this.calcHeight(values[2][i])]} />
          </View>
          <View style={[styles.barBoxBottom]}>
            <Text  style={[styles.barText]}>{axis[i]}</Text>
          </View>
        </View>
      </TouchableHighlight>
      )
    });

    const borderWidth = 2;
    return <View style={[styles.container,this.setHeight()]}>
      <View style={[styles.chartItems]}>{bars}</View>
    </View>;
    }
};

const styles = StyleSheet.create({
  container: {
	  display: 'flex',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartItems: {
	  display: 'flex',
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  barBoxButton :{
    display: 'flex',
    flex: 1,
  },
  barBoxContainer :{
	  display: 'flex',
    flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'column',
      alignSelf: 'stretch',
      borderColor:'lightgray',
  },
  barBox: {
	  display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
  },
  barBoxBottom: {
	  display: 'flex',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  barText: {
	  display: 'flex',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
    paddingTop: 2,
    paddingBottom: 2,
    color: 'gray',
  },
  bar: {
	  display: 'flex',
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginLeft: 2
  },
  barPast: {
    backgroundColor: colors.chartBlue,
  },
  barReal: {
    backgroundColor: colors.chartRed,
  },
  barFuture: {
    backgroundColor: colors.chartYellow,
  }
});
