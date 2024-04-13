import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../utils/colors'
import { getCurrentYear } from '../../utils/MonthlyScheduler'
import { getSpendsByEmail } from '../../api-services/spendArchive';
import { client } from '../../utils/kindeConfig';

export default function History() {
  const currYear = getCurrentYear();
  const [spends, setSpends] = useState({});
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

  useEffect(() => {
    async function fetch(){
      const user = await client.getUserDetails();
      const spendings = await getSpendsByEmail(user?.email);
      setSpends(JSON.parse(spendings));
    }

    
    fetch();
    console.log("spend state",spends)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontFamily: 'outfit-bold', fontSize: 25, color: colors.WHITE, marginTop: 10}}>Your expenditure in {currYear}</Text>
      </View>
      <View style={styles.subcontainer}>
        {months.map((month, index)=>{
          return<View  key={index}>
             <View style={styles.itemContainer}>
            <Text style={{fontFamily: 'outfit-bold', fontSize: 25}}>{month}: </Text> 
            {spends[month] > 0 ? <Text style={{fontSize: 25, color: colors.PRIMARY}}>₹ {spends[month]}</Text> 
            : <Text style={{fontSize: 25, color: colors.PRIMARY}}>-</Text>}
          </View>
           { index < 11 && <View style={styles.divider}></View>}
          </View>
        })}
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
  subcontainer: {
    height: 600,
    width: '80%',
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    position: 'absolute',
    top: 100,
    right: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  divider: {
    borderWidth: 0.5,
    borderColor: colors.GRAY
  }
})