import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getCategoryDetailApi } from '../api-services/categoryAPI';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';
import CategoryList from '../Components/CategoryList';

export default function categoryDetails() {
    const {categoryId} = useLocalSearchParams();
    const [categoryData, setCategoryData] = useState({});
    const [moneySpent, setMoneySpent] = useState(0);
    const [totalPercent, setTotalPercent] = useState(0);

    const router = useRouter();

    useEffect(()=>{
        categoryId && getCategoryDetail(categoryId);
    }, [categoryId])

    useEffect(() => {
      calculateTotalPercentage();
    }, [categoryData])

    async function getCategoryDetail(categoryId){
      const data =  await getCategoryDetailApi(categoryId);
      setCategoryData(data[0]);
    }

    function calculateTotalPercentage(){
      let total = 0;
      categoryData?.CategoryItems?.map(item => total += item?.cost);
      setMoneySpent(total);

      const perc = (total / categoryData?.assigned_budget) * 100;
      const finalPerc = perc > 100 ? 100 : perc;
      setTotalPercent(finalPerc)
    }
  return (
    <View style={styles.container}>
      <View>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-circle-sharp" size={44} color={colors.PRIMARY} />
          </TouchableOpacity>
          <View style={{marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={styles.iconContainer}>
              <Text style={[styles.textIcon, {backgroundColor: categoryData?.color}]}>{categoryData?.icon}</Text>
            </View>
            <View style={{flex: 1, marginLeft: 20}}>
              <Text style={styles.categoryName}>{categoryData?.name}</Text>
              <Text style={styles.categoryItems}>{categoryData?.CategoryItems?.length} Items</Text>
            </View>
            <Ionicons name="trash-sharp" size={24} color={colors.RED} />
          </View>
          {/* progress bar  */}
          <View style={styles.amountContainer}>
            <Text style={{fontFamily: 'outfit-bold'}}>₹{moneySpent}</Text>
            <Text style={{fontFamily: 'outfit'}}>Assigned Budget: ₹{categoryData?.assigned_budget}</Text>
          </View>

          <View style={styles.progressBarMainContainer}>
              <View style={[styles.progressBarSubContainer, {width: `${totalPercent}%`, color: `${totalPercent >= 100 ? 'red' : 'black'}` }]}></View>
          </View>
      </View>
      <ItemsList categoryData={categoryData} />
    </View>
  )
}

function ItemsList({categoryData}){
  return(
    <View style={listStyle.container}>
      <Text style={listStyle.heading}>Item List</Text>

      <View>
        {categoryData?.CategoryItems?.length > 0 ? categoryData?.CategoryItems?.map((item, index)=>{
          return <View key={index}>
          <View style={listStyle.itemContainer}>
            <Image source={{uri: item.image}} style={listStyle.image}/>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '70%'}}>
              <Text style={{fontFamily: 'outfit', fontSize: 20}}>{item.name}</Text>
              <Text style={{fontFamily: 'outfit-bold', fontSize: 20}}>₹{item.cost}</Text>
            </View>
          </View>
          {categoryData?.CategoryItems?.length-1 !== index && <View style={{borderWidth: 0.5, marginTop: 10, borderColor: colors.GRAY}}></View>}
          </View>
        }) : <Text style={listStyle.noItemsText}>No items added yet!</Text>}
      </View>
    </View>
  )
}

const listStyle = StyleSheet.create({
  container: {
    marginTop: 20
  },
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 20
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 15
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  noItemsText: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    color: colors.GRAY
  }
})

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20
  },
  textIcon: {
    fontSize: 35,
    padding: 20,
    borderRadius: 15
  },
  iconContainer: {
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  categoryName: {
    fontFamily: 'outfit-bold',
    fontSize: 24
  },
  categoryItems: {
    fontFamily: 'outfit',
    fontSize: 16
  },
  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  progressBarMainContainer: {
    width: '100%',
    height: 15,
    backgroundColor: colors.GRAY,
    borderRadius:99,
    marginTop: 7
  },
  progressBarSubContainer: {
    borderRadius: 99,
    height: 15,
    backgroundColor: colors.PRIMARY
  }
})