import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/colors'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';   
import { supabase } from '../utils/supabase';
import {decode} from 'base64-arraybuffer'
import { addCategoryItem } from '../api-services/categoryItemsAPI';
import { useLocalSearchParams, useRouter } from 'expo-router';


export default function AddNewCatItem() {
    const [image, setImage] = useState("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png");
    const [previewImage, setPreviewImage] = useState("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [note, setNote] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {categoryId} = useLocalSearchParams();
    const router = useRouter();

    async function onImagePick(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 0.7,
            base64: true
          });

          if(!result.canceled && result){
            setPreviewImage(result.assets[0].uri);
            setImage(result.assets[0].base64);
          }else{
            setPreviewImage("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png");
            setImage("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png");
          }
    }

    async function handleAddItem(){
        setIsLoading(true);
        const fileName = Date.now() + (Math.random() * 10);
        const {data, error} = await supabase
        .storage
        .from('item-images')
        .upload(fileName+'.png', decode(image),{ contentType: 'image/png'})

        if(data){
            let fileUrl = `https://nuwjrrfigxfaxkmulvff.supabase.co/storage/v1/object/public/item-images/${data.path}`;
            if(image == "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"){
                fileUrl = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
            }
            const dataAdded = addCategoryItem({name, cost: price, note, category_id: categoryId, image: fileUrl});
            if(dataAdded){
                ToastAndroid.show("Item added succesfully!", ToastAndroid.SHORT);
                setImage("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png");
                setName("");
                setNote("");
                setPreviewImage("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png");
                setPrice("");

                setIsLoading(false);
                router.replace({
                    pathname: '/category-details',
                    params: {
                        categoryId : categoryId
                    }
                });
            }else{
                ToastAndroid.show("Could not add item :(", ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show("Could not create category :(", ToastAndroid.SHORT);
        }
        
    }
  return (
    <KeyboardAvoidingView>
            <ScrollView>
                    <View style={{padding: 20}}>
                        <TouchableOpacity onPress={() => onImagePick()} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                            <Image source={{uri: previewImage}} style={styles.image} />
                        </TouchableOpacity>
                        <View style={styles.textInputContainer}>
                            <Ionicons name="pricetag" size={24} color={colors.GRAY} />
                            <TextInput style={{fontSize: 17, width: '100%'}} placeholder='Item Name' onChangeText={(value)=>setName(value)} />
                        </View>
                        <View style={styles.textInputContainer}>
                            <FontAwesome name="rupee" size={24} color={colors.GRAY} />
                            <TextInput style={{fontSize: 17, width: '100%'}} placeholder='Item Price' keyboardType='numeric' onChangeText={(value)=>setPrice(value)} />
                        </View>
                        <View style={styles.textInputContainer}>
                            <Ionicons name="clipboard" size={24} color={colors.GRAY} />
                            <TextInput style={{fontSize: 17, width: '100%'}} placeholder='Note' numberOfLines={5} onChangeText={(value) => setNote(value)} />
                        </View>
                        <TouchableOpacity onPress={()=>handleAddItem()} style={styles.button} disabled={!name || !price || isLoading}>
                            {isLoading ? <ActivityIndicator color={colors.WHITE} /> :
                            <Text style={{textAlign: 'center', fontFamily:'outfit-bold', color: colors.WHITE}}>Add</Text>}
                        </TouchableOpacity>
                    </View>
            </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        backgroundColor: colors.GRAY,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: colors.GRAY,
    },
    textInputContainer: {
        padding: 10,
        borderWidth: 1,
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 10,
        borderColor: colors.GRAY,
        marginTop: 10
    },
    button: {
        padding: 20,
        backgroundColor: colors.PRIMARY,
        borderRadius: 15,
        marginTop: 25
    }
})