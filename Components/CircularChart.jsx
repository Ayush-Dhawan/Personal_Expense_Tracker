import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../utils/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import PieChart from 'react-native-pie-chart'

export default function CircularChart({categoryList}) {
    const widthAndHeight = 150;
    const [values, setValues] = useState([1]);
    const [sliceColor, setSliceColor] = useState([colors.GRAY])
    const [totalEstimate, setTotalEstimate] = useState(0);

    const sortedCategories = categoryList.sort((a, b) => b.assigned_budget - a.assigned_budget)

    function updateCircularChart() {
      setValues([1]);
      setSliceColor([colors.GRAY]);
      sortedCategories.forEach((item, index) => {
        if (index < 4) {
          let itemTotalCost = 0;
          item.CategoryItems.forEach((item_) => {
            itemTotalCost += item_.cost;
            setTotalEstimate((x) => x + item_.cost);
          });
          setSliceColor((sliceColor) => [...sliceColor, colors.COLOR_LIST[index]]);
          setValues((values) => [...values, itemTotalCost]);
        } else {
          let otherCost = 0; // Initialize otherCost inside the loop scope
          item.CategoryItems.forEach((item_) => {
            otherCost += item_.cost;
            setTotalEstimate((x) => x + item_.cost);
          });
          setSliceColor((sliceColor) => [...sliceColor, colors.COLOR_LIST[4]]);
          setValues((values) => [...values, otherCost]);
        }
      });
    }
    

    useEffect(()=>{
      setTotalEstimate(0)
      updateCircularChart();
    }, [categoryList])
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontFamily: 'outfit'}}>Total Estimate: <Text style={{fontFamily: 'outfit-bold'}}>₹{totalEstimate}</Text> </Text>
      <View style={styles.subContainer}>
      <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.65}
            coverFill={'#FFF'}
          />
          {categoryList?.length == 0 ? <View style={styles.chartLegends}>
          <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={colors.GRAY} />
          <Text>NA</Text>
          </View> : 
          <View>
              {categoryList.map((item, index) => {
                return index<= 4 && <View key={index} style={styles.chartLegends}>
                  <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={sliceColor[index+1]} />
                  <Text>{index < 4 ? item?.name : "Others"}</Text>
                </View>
              })}
            </View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        marginTop: 20,
        backgroundColor: colors.WHITE,
        padding: 20,
        borderRadius: 15,
        elevation: 1
    },
    subContainer: {
        marginTop: 10, 
        display: 'flex', 
        flexDirection: 'row',
        gap: 40
    },
    chartLegends: {display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}
})