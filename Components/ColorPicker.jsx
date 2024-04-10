import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/colors'

export default function ColorPicker({setSelectedColor}) {
    const [isSelected, setIsSelected] = useState('#9F3CFE')
  return (
    <View style={{display: 'flex', flexDirection: 'row', gap: 20, marginTop: 10}}>
      {colors.COLOR_LIST.map((color, index) => {
        return <TouchableOpacity onPress={() =>{setSelectedColor(color); setIsSelected(color)}} key={index} style={{height: 30, 
            width: 30, 
            backgroundColor: color,
            borderWidth: isSelected === color ? 3 : 0, // Add border if selected
            borderColor: isSelected === color ? 'black' : 'transparent', // Border color
             borderRadius: 99}}></TouchableOpacity>
      })}
    </View>
  )
}