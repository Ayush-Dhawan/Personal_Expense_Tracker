import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, RefreshControl, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { deleteCategory, getCategoryDetailApi } from '../api-services/categoryAPI';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';
import CategoryList from '../Components/CategoryList';
import { deleteCategoryItems, deleteItemByID } from '../api-services/categoryItemsAPI';

export default function categoryDetails() {
    const {categoryId} = useLocalSearchParams();
    const [categoryData, setCategoryData] = useState({});
    const [moneySpent, setMoneySpent] = useState(0);
    const [totalPercent, setTotalPercent] = useState(0);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(()=>{
        categoryId && getCategoryDetail(categoryId);
    }, [categoryId])

    useEffect(() => {
      calculateTotalPercentage();
    }, [categoryData])

    async function getCategoryDetail(categoryId){
      setLoading(true);
      const data =  await getCategoryDetailApi(categoryId);
      setCategoryData(data[0]);
      setLoading(false);
    }

    function calculateTotalPercentage(){
      let total = 0;
      categoryData?.CategoryItems?.map(item => total += item?.cost);
      setMoneySpent(total);

      const perc = (total / categoryData?.assigned_budget) * 100;
      const finalPerc = perc > 100 ? 100 : perc;
      setTotalPercent(finalPerc)
    }

     function handleDelete(){
      Alert.alert("Are you sure you want to delete?", 
      "This action cannot be undone",
       [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
             await deleteCategoryItems(categoryId);
             await deleteCategory(categoryId);

             ToastAndroid.show("Category deleted!", ToastAndroid.SHORT)
             router.replace('/')
          }
        }
      ])
    }
  return (
    <View>
      <AddItem categoryData={categoryData} />
      <ScrollView refreshControl={
      <RefreshControl onRefresh={() => getCategoryDetail(categoryId)} refreshing={loading} />
    } style={styles.container}>
      <View>
          <TouchableOpacity onPress={() => router.replace("/")}>
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
            <TouchableOpacity onPress={handleDelete}>
              <Ionicons name="trash-sharp" size={24} color={colors.RED} />
            </TouchableOpacity>
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
    </ScrollView>
    </View>
  )
}

function AddItem({categoryData}){
  return(
    <View>
        <Link href={{pathname: '/addNewCatItem',
        params: {
          categoryId: categoryData?.id
        }}}
         style={addItemStyle.floatingbtn}>
           <Ionicons name="add-circle" size={54} color={colors.PRIMARY} />
        </Link>
    </View>
  )
}

function ItemsList({categoryData}){
  const {categoryId} = useLocalSearchParams();
  const [expandItem, setExpandItem] = useState(-1);
  const router = useRouter();

  function onClickItem(index){
    setExpandItem(index)
  }

  function handleDeleteItem(id){
    Alert.alert("Are you sure you want to delete this item?", 
    "This action cannot be undone",
     [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
           await deleteItemByID(id)

           ToastAndroid.show("Item deleted!", ToastAndroid.SHORT)
           router.replace({
            pathname: '/category-details',
            params: {
                categoryId : categoryId
            }
        })
        }
      }
    ])
  }
  return(
    <View style={listStyle.container}>
      <Text style={listStyle.heading}>Item List</Text>

      <View>
        {categoryData?.CategoryItems?.length > 0 ? categoryData?.CategoryItems?.map((item, index)=>{
          return <View key={index} >
          <TouchableOpacity style={listStyle.itemContainer} onPress={()=> onClickItem(index)}>
            <Image source={{uri: item.image}} style={listStyle.image}/>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '70%'}}>
              <Text style={{fontFamily: 'outfit', fontSize: 20}}>{item.name}</Text>
            <Text style={{fontFamily: 'outfit-bold', fontSize: 20}}>₹{item.cost}</Text>
            </View>
          </TouchableOpacity>
          {expandItem === index &&
          <View style={listStyle.actionItemContainer}>
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
              <Ionicons name="trash-sharp" style={{textAlign: 'center'}} size={34} color={colors.RED} />
            </TouchableOpacity>
          </View>}
          {categoryData?.CategoryItems?.length-1 !== index && <View style={{borderWidth: 0.5, marginVertical: 5, borderColor: colors.GRAY}}></View>}
          </View>
        }) : <Text style={listStyle.noItemsText}>No items added yet!</Text>}
      </View>
    </View>
  )
}

const addItemStyle = StyleSheet.create({
  floatingbtn: {
    position: 'absolute',
    bottom: -785,
    right: 16,
    zIndex: 2
  }
})

const listStyle = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10
  },
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 20
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: colors.GRAY
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: colors.WHITE, borderRadius: 15,
  },
  noItemsText: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
    color: colors.GRAY
  },
  actionItemContainer: {

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