import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import {Video, ResizeMode} from "expo-av"

const VideoCard = ({video: { title, thumbnail, video, creator:{username, avatar}}}) => {
    const [play, setPlay] = useState(false)
    const [menuTab, setMenuTab] = useState("hidden")

    const menu = () =>{
        if(menuTab === "hidden"){
            setMenuTab("")
        }else{
            setMenuTab("hidden")
        }
    }
  return (
    <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image
                    source={{uri: avatar}}
                    className="w-full h-full rounded-lg"
                    resizeMode='cover'
                    />
                </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm"
                        numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text className="text-xs text-gray-100 font-pregular"
                        numberOfLines={1}
                        >
                            {username}
                        </Text>
                    </View>
            </View>
            <TouchableOpacity className="pt-2"
            onPress={menu}
            >
                <Image
                source={icons.menu}
                className="w-5 h-5"
                resizeMode='contain'
                
                />
            </TouchableOpacity>
          
        </View>
        {play? (
            <Video
                source={{ uri: video }}
                className="w-full h-60 rounded-xl mt-3"
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                    if (status.didJustFinish) {
                    setPlay(false);
                    }
                }}
           />
        ):(
            <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=> setPlay(true)}
            onPressIn={()=>setMenuTab("hidden")}
            className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
            >
            <Image
            source={{uri: thumbnail}}
            className="w-full h-full roundedxl mt-3"
            resizeMode='cover'
            />
            <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode='contain'
            />
           </TouchableOpacity>
            
        )}
          <View className = {`absolute top-9 right-4  pl-5 pr-10 py-3  bg-black-100 border border-black-200 rounded-sm ${menuTab}`}>
          <TouchableOpacity className="mb-2 flex-row items-center gap-x-2">
                 <Image
                    source={icons.bookmark}
                    className="w-4 h-4"
                    resizeMode='contain'
                
                    />
                <Text className="text-white font-psemibold pt-1">Save</Text> 
           </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-x-2">
                <Image
                source={icons.bookmark}
                className="w-4 h-4"
                resizeMode='contain'
                
                />
                <Text className="text-white font-psemibold pt-1">Delete</Text> 
          </TouchableOpacity>
         
            </View>
    </View>
  )
}

export default VideoCard