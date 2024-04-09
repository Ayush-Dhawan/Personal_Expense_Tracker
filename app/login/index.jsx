import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import loginbg from '../../assets/images/login-bg.png'
import colors from '../../utils/colors'
import {client} from '../../utils/kindeConfig'
// import services from '../../utils/services'
import { useRouter } from 'expo-router'
import { storeData } from '../../utils/services'

export default function LoginScreen() {
    const router = useRouter();

    const handleSignIn = async () => {
        const token = await client.login();
        if (token) {
          // User was authenticated
          await storeData('login', 'true')
          router.replace('/')
        }
      };
      

  return (
    <View style={styles.container}>
      <Image source={loginbg} style={styles.bgImage} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Personal Expense Tracker</Text>
        <Text style={styles.subHeading}>Stay on track, Event by Event</Text>

        <TouchableOpacity style={styles.button}
        onPress={handleSignIn}
        >
            <Text style={{textAlign: 'center', color: colors.PRIMARY}}>Login/SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    bgImage: {
        width: 200,
        height: 420,
        marginTop: 70,
        borderWidth: 5,
        borderRadius: 20,
        borderColor: colors.BLACK,
    },
    headingContainer: {
        backgroundColor: colors.PRIMARY,
        width: '100%',
        height: '100%',
        padding: 20,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    heading: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.WHITE,
    },
    subHeading: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.WHITE,
        marginTop: 20
    },
    button: {
        backgroundColor: colors.WHITE,
        padding: 15,
        paddingHorizontal: 5,
        borderRadius: 80,
        marginTop: 20
    }
})