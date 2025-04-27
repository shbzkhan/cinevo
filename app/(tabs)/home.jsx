import { View, Text, FlatList, Image, RefreshControl,Alert } from 'react-native'
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

const Home = () => {

const {user, setLoading, colorScheme}= useGlobalContext()
  const [refreshing, setRefreshing] = useState(false)
  const [videos, setVideos]= useState([])
  const [deleteLoading, setDeleteLoading] = useState(null)

const fetchVideos = async () => {
  try {
    const {data} = await axios.get(`${process.env.EXPO_PUBLIC_MONGODB}/videos`);
      setVideos(data.data);
      console.log("Posts successfully fetched !!!!!")
  } catch (error) {
    console.log("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};

const deleteAlert = (id) => {

    Alert.alert("Delete", "You want to delete the post", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
         onPress:()=> deleteVideo(id),
        style: "destructive",
      },
    ]);
  };

  const deleteVideo = async (id) => {
    
    setDeleteLoading(id)
    try {
      const { data } = await axios.delete(
        `${process.env.EXPO_PUBLIC_MONGODB}/videos/delete/${id}`,
        {
          data: {
            userId: user._id,
          },
        }
      );
      console.log("video deleted");
      if (data.success) {
         const deleteVideo = videos.filter(video => video._id !== id )
         setVideos(deleteVideo)
      }
    } catch (error) {
      console.log(error.response.data.message);
      Alert.alert("Error", error.response.data.message);
    } finally {
      setDeleteLoading(null)
    }
  };


  const onRefresh = async () =>{
    setRefreshing(true)
    fetchVideos();
    setRefreshing(false)
  }

const handleVideoPress= (id)=>{
  router.push(`../videodetails/${id}`)
}

useEffect(()=>{
  fetchVideos()

},[])
  return (
    <SafeAreaView className="bg-white h-full dark:bg-black"> 
     <View className="justify-between items-start flex-row py-1 px-4">
          <View className="mt-1.5 flex flex-row items-center">
            <Image 
                source={images.logoSmall}
                className="w-9 h-10"
                resizeMode='contain'
            />
            <Text className="text-black font-psemibold text-2xl dark:text-white">Cinevo</Text>
          </View>
          <View className="my-auto">
            {/* <Text className="font-pmedium text-sm text-black">Welcome</Text>
            <Text className="text-2xl font-psemibold text-gray-500">
              {user?.username}
              </Text> */}
              <Image 
                source={icons.search}
                className="w-6 h-6 "
                resizeMode='contain'
                tintColor={colorScheme == "dark"?"white": "black"}
            />
          </View>

          
          </View>
      <FlatList
      data={videos}   
      keyExtractor={(item)=>{item._id}}
      renderItem={({item})=>(
          <VideoCard video={item}
          deleteAlert = {deleteAlert}
          deleteLoading={deleteLoading}
          onPress = {()=>handleVideoPress(item._id)}
          />
      )}
      ListHeaderComponent={()=>(
        <View className="my-6 px-4 space-y-6">
         
            <SearchInput/>
        </View>
      )}
      ListEmptyComponent={()=>(
        <EmptyState
        title="No video founded"
        subtitle="Be the first one to upload the video"
        
        />
      )}
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        />
      }
      />
    </SafeAreaView>
  )
}

export default Home