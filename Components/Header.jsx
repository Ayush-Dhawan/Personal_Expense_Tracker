import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { client } from '../utils/kindeConfig';
import colors from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const [user, setUser] = useState();

    useEffect(() =>{
        getUserData();
    }, [])

    const getUserData = async () =>{
        const user = await client.getUserDetails();
        setUser(user);
    }
  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
      <Image style={styles.pfp} source={{uri:user?.picture || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}} />
      <View style={{fontFamily: 'outfit'}}>
        <Text style={{color: colors.WHITE, fontSize: 16}}>Welcome,</Text>
        <Text style={{color: colors.WHITE, fontSize: 20, fontWeight: 'bold', fontFamily: 'outfit-bold'}}>{user?.given_name}</Text>
      </View>
      </View>
      <Ionicons name="notifications" size={24} color={colors.WHITE} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pfp: {
        width: 50,
        height: 50,
        borderRadius: 99
    }
})