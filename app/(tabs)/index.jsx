import { View, Text, Button, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData, storeData } from '../../utils/services'
import { Link, useRouter } from 'expo-router'
import {client} from '../../utils/kindeConfig'
import { getCategoriesAndItemsByEmail } from '../../api-services/categoryAPI'
import Header from '../../Components/Header'
import { AntDesign } from '@expo/vector-icons';
import colors from '../../utils/colors'
import CirularChartChart from '../../Components/CircularChart'
import CategoryList from '../../Components/CategoryList'




export default  function Home() {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false)

    async function getCategoryList(){
      setLoading(true);
      const user = await client.getUserDetails();
      // const {data, error} = await supabase.from('Category').select('*, CategoryItems(*)').eq('created_by', user.email)
      const categories = await getCategoriesAndItemsByEmail(user?.email);

      setLoading(false);

      if(categories){
        setCategoryList(categories);
      return categories;
      }else{
        setCategoryList([]);
        return;
      }
    }
    useEffect(() =>{
      checkUserAuth();
      getCategoryList();
  }, [])

    const handleLogout = async () => {
        const loggedOut = await client.logout();
        if (loggedOut) {
            // User was logged out
            await storeData('login', 'false');
            router.replace('/login')
        }
    };

    
    const router = useRouter();

    const checkUserAuth = async ()=>{
        const result = await getData("login");

        if(result !== 'true'){
            router.replace('/login')
        }
    }
  return (
    <View style={{ position: 'relative' }}>
          <Link href={'/addNewCategory'} style={styles.addButton}>
      <AntDesign name="pluscircle" size={50} color={colors.PRIMARY} />
    </Link>
    <ScrollView refreshControl={
      <RefreshControl onRefresh={() => getCategoryList()} refreshing={loading} />
    }>
    <View style={styles.container}>
      <Header />
    </View>
      <View style={{padding: 20, marginTop: -90 }}>
        <CirularChartChart />
        <CategoryList categoryList={categoryList} />
      </View>
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 20,
    backgroundColor: colors.PRIMARY,
    height: 155,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    elevation: 20,
    zIndex: 2
  }
})