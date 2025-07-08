import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {icons, images} from "../constants"
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '')
  return (
      <View className="border-1 border-gray-200 w-full h-16 px-4 bg-gray-100 rounded-xl focus:border-gray-600 items-center flex-row space-x-4">
    <TextInput
    className="text-base font-psemibold mt-0.5 text-black-200 flex-1 "
    value={query}
    placeholder="Search for a video topic"
    placeholderTextColor="#9E9E9E"
    onChangeText={(e)=> setQuery(e)}
    
    />
    <TouchableOpacity
    onPress={()=>{
      if(!query){
        return Alert.alert("Missing Query", "Please input something to search results across database")
      }
      if(pathname.startsWith('/search')) router.setParams({query})
        else router.push(`/search/${query}`)
    }}
     >
        <Image
        source={icons.search}
        className="w-6 h-6 "
        resizeMode='contain'
        tintColor="black"
        />
    </TouchableOpacity>
      </View>
  )
}

export default SearchInput