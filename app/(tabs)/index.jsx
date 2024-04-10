import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { getData, storeData } from '../../utils/services'
import { Link, useRouter } from 'expo-router'
import {client} from '../../utils/kindeConfig'
import { getCategoriesByEmail } from '../../api-services/categoryAPI'
import { supabase } from '../../utils/supabase'
import Header from '../../Components/Header'
import { AntDesign } from '@expo/vector-icons';
import colors from '../../utils/colors'
import CirularChartChart from '../../Components/CircularChart'


async function getCategoryList(){
  const user = await client.getUserDetails();
  // const {data, error} = await supabase.from('Category').select('*').eq('created_by', user.email)
  const categories = await getCategoriesByEmail(user.email);
}

export default  function Home() {

  
    const handleLogout = async () => {
        const loggedOut = await client.logout();
        if (loggedOut) {
            // User was logged out
            await storeData('login', 'false');
            router.replace('/login')
        }
    };

    
    const router = useRouter();
    useEffect(() =>{
        checkUserAuth();
        getCategoryList();
    }, [])
    const checkUserAuth = async ()=>{
        const result = await getData("login");

        if(result !== 'true'){
            router.replace('/login')
        }
    }
  return (
    <View style={{ position: 'relative' }}>
    <View style={styles.container}>
      <Header />
      <CirularChartChart />
    </View>
    <Link href={'/addNewCategory'} style={styles.addButton}>
      <AntDesign name="pluscircle" size={50} color={colors.PRIMARY} />
    </Link>
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
    bottom: -560,
    right: 16
  }
})