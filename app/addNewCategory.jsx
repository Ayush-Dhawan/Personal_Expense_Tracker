import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/colors';
import ColorPicker from '../Components/ColorPicker';
import { MaterialIcons } from '@expo/vector-icons';
import { client } from '../utils/kindeConfig';
import { addCategoryAPI } from '../api-services/categoryAPI';
import { useRouter } from 'expo-router';

export default function addNewCategory() {
    const [selectedIcon, setSelectedIcon] = useState('DF');
    const [selectedColor, setSelectedColor] = useState(colors.PRIMARY);
    const [categoryName, setCategoryName] = useState('');
    const [totalBudget, setTotalBudget] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function handleAddCategory(){
        setIsLoading(true);
        const user = await client.getUserDetails();
        const data = [
            {
                "name": categoryName,
                "created_by": user?.email,
                "icon": selectedIcon,
                "color": selectedColor,
                "assigned_budget": totalBudget
            }
        ]

        const dataAdded = addCategoryAPI(data);
        setIsLoading(false);
        if(dataAdded) {
            ToastAndroid.show("Category created succesfully!", ToastAndroid.SHORT);
            setTotalBudget(0);
            setCategoryName('');
            setSelectedIcon('');
            router.replace('/');
        }else{
            ToastAndroid.show("Could not create category :(", ToastAndroid.SHORT);
        }
    }
  return (
    <View style={styles.container} >
      <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <TextInput onChangeText={(value) => setSelectedIcon(value)} style={[styles.iconInput,{backgroundColor: selectedColor}]} maxLength={2} >{selectedIcon}</TextInput>
      <ColorPicker setSelectedColor={setSelectedColor} />
      </View>

      {/* add category name and total budget section */}
      <View style={styles.inputView}>
      <MaterialIcons name="local-offer" size={24} color={colors.GRAY} />
      <TextInput onChangeText={(value)=>setCategoryName(value)} style={{width: '100%', fontSize: 17}} placeholder='Category Name' />
      </View>

      <View style={styles.inputView}>
      <MaterialIcons name="currency-rupee" size={24} color={colors.GRAY} />
      <TextInput  onChangeText={(value)=>setTotalBudget(value)} style={{width: '100%', fontSize: 17}} placeholder='Total Budget' keyboardType='numeric' />
      </View>

      <TouchableOpacity onPress={handleAddCategory} disabled={!categoryName || !totalBudget || isLoading} style={[styles.button, {backgroundColor: selectedColor}]} >
        {isLoading ? <ActivityIndicator color={colors.WHITE} /> : 
        <Text style={{textAlign: 'center', color: colors.WHITE, fontSize: 20}}>Create category</Text>}
        
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 20
    },
    iconInput: {
        textAlign: 'center',
        fontSize: 30,
        padding: 20,
        borderRadius: 99,
        paddingHorizontal: 28,
        color: colors.WHITE
    },
    inputView: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        padding: 14,
        borderRadius: 10,
        borderColor: colors.GRAY,
        backgroundColor: colors.WHITE,
        marginTop: 15
    },
    button: {
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
    }
})