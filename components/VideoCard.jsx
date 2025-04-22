import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { deletePost} from '../lib/appwrite'
import { Alert } from 'react-native'
import { useGlobalContext } from '../context/GlobalProvider'
import axios from 'axios'

const VideoCard = ({video,onPress}) => {
    const {user} = useGlobalContext()

 
    
  return (
    <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.3}
     className="flex-col items-center mb-14">


            <View
            // activeOpacity={0.7}
            className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
            >
            <Image
            source={{uri: video.thumbnailUrl}}
            className="w-full h-full roundedxl mt-3"
            resizeMode='cover'
            />
           </View>
            
       
         <View className="flex-row gap-3 items-start px-4 mt-3">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg  justify-center items-center p-0.5">
                    <Image
                    source={{uri: user.image}}
                    className="w-full h-full rounded-lg"
                    resizeMode='cover'
                    />
                </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-black font-psemibold text-sm dark:text-white"
                        numberOfLines={1}
                        >
                            {video.title}
                        </Text>
                        <Text className="text-xs text-gray-500 font-pregular"
                        numberOfLines={1}
                        >
                            {video.user.username}
                        </Text>
                    </View>
            </View>
        
        {/* this is fav or delete video */}
          <View className="flex flex-row items-center justify-center " >
          <TouchableOpacity className="flex-row items-center px-2">
                 <Image
                    source={icons.bookmark}
                    className="w-5 h-5 text-gray-100"
                    resizeMode='contain'
                
                    />
         
           </TouchableOpacity>
            <TouchableOpacity 
            // onPress={deleteVideo}
            className="flex-row items-center h-full px-2">
                <Image
                source={icons.deleteIcon}
                className="w-6 h-6"
                resizeMode='contain'
                tintColor={"red"}
                />
 
          </TouchableOpacity>

            </View>
        </View>
    </TouchableOpacity>
  )
}

export default VideoCard