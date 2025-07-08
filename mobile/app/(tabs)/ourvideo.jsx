import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { useState, useEffect } from 'react'

import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'
import axios from 'axios'

const Bookmark = () => {

const {user, setLoading, colorScheme}= useGlobalContext()
  const [videos, setVideos]= useState([])

  console.log("USER", user._id)
const fetchVideos = async () => {
  try {
    const {data} = await axios.get(`${process.env.EXPO_PUBLIC_MONGODB}/videos/user/${user._id}`);
      setVideos(data.data);
      console.log("Posts successfully fetched !!!!!",)
  } catch (error) {
    console.log("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};

// console.log("USER VIDEO!!!", videos) 

const handleVideoPress= (id)=>{
  router.push(`../videodetails/${id}`)
}

useEffect(()=>{
  fetchVideos()

},[user])
  return (
    <SafeAreaView className="bg-white h-full dark:bg-black"> 
     
      <FlatList
      data={videos}   
      keyExtractor={(item)=>{item._id}}
      renderItem={({item})=>(
          <VideoCard video={item}
          onPress = {()=>handleVideoPress(item._id)}
          />
      )}
      ListHeaderComponent={()=>(
        <View className="my-6 px-4 space-y-6">
            <Text className="text-black font-psemibold text-2xl dark:text-white">Our Videos</Text>
        </View>
      )}
      ListEmptyComponent={()=>(
        <EmptyState
        title="No video founded"
        subtitle="Be the first one to upload the video"
        
        />
      )}
      
      />
    </SafeAreaView>
  )
}

export default Bookmark