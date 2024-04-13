import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useDebugValue, useEffect, useState } from 'react'
import colors from '../../utils/colors'
import { client } from '../../utils/kindeConfig';
import { storeData } from '../../utils/services';
import { useRouter } from 'expo-router';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();

  async function getUserInfo(){
    const userData = await client.getUserDetails();
    console.log(userData)
    setUserInfo(userData);
  }

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
        // User was logged out
        await storeData('login', 'false');
        router.replace('/login')
    }
};


  useEffect(()=>{
    getUserInfo();
  }, [])

  return (
    <View style={styles.container} >
      <View style={styles.header}>
          <Image style={styles.image} source={{uri: userInfo?.picture || "https://avatar.iran.liara.run/public"}}></Image>
      </View>
      <View style={styles.subContainer}>
        <Text style={{textAlign: 'center', fontFamily: 'outfit-bold', fontSize: 25}}>{userInfo?.given_name}</Text>
        <Text style={{textAlign: 'center', fontFamily: 'outfit', fontSize: 16}}>{userInfo?.email}</Text>
        {/* <Text>Total Expenditure: </Text> */}
      </View>
      <View style={styles.footer}>
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={{fontFamily: 'outfit-bold', fontSize: 16, color: colors.PRIMARY, textAlign: 'center'}}>Logout</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  header: {
    padding: 20,
    backgroundColor: colors.PRIMARY,
    height: 220,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  footer: {
    padding: 20,
    backgroundColor: colors.PRIMARY,
    height: 320,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50
  },
  image: {
    height: 200,
    width: '60%',
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.GRAY,
    marginTop: 65
  },
  subContainer: {
    marginTop: 90,

  },
  logout: {
        padding: 0,
        borderRadius: 10,
        backgroundColor: colors.WHITE,
        height: 40,
        width: '60%',
        display: 'flex',
        justifyContent: 'center'
  }
})