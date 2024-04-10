import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../utils/colors'
import { useRouter } from 'expo-router'

export default function CategoryList({categoryList}) {
    const router = useRouter();

    function onCategoryClick(category){
        router.push({
            pathname: '/category-details',
            params: {
                categoryId : category.id
            }
        })
    }
  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'outfit-bold', fontSize: 25, marginBottom: 10, color: colors.PRIMARY}}>Latest Budget</Text>

      <View>
      {categoryList?.map((category, index) => {
            return <TouchableOpacity key={index} onPress={() => onCategoryClick(category)}>
                        <View style={styles.iconContainer}>
                            <Text style={[styles.iconText, {backgroundColor: category.color}]}>{category.icon}</Text>
                            <View style={styles.subContainer}>
                                <View>
                                        <Text style={styles.categoryText}>{category.name}</Text>
                                        <Text style={styles.itemCount}>{category?.CategoryItems.length} Items</Text>
                                </View>
                                <View>
                                        <Text style={styles.totalAmountText}>₹5000</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,

    },
    iconText: {
        fontSize: 30,
        padding: 10,
        borderRadius: 15,
        marginVertical: 4
    },
    iconContainer: {
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: colors.WHITE,
        padding: 10,
        borderRadius: 15,
        marginVertical: 3
    },
    categoryText: {
        fontFamily: 'outfit-bold',
        fontSize: 20
    },
    itemCount: {
        fontFamily: 'outfit'
    },
    subContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "70%"
    },
    totalAmountText: {
        fontFamily: 'outfit-bold',
        fontSize: 15
    }
})