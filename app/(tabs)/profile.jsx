import { View,FlatList, TouchableOpacity, Image, RefreshControl, Switch, Text} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import { StatusBar } from 'expo-status-bar'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'
// import { useColorScheme } from 'nativewind'



const Profile = () => {
  const {user, setUser, setIsLoggedIn, colorScheme, toggleColorScheme}= useGlobalContext()
  const logOut = async()=>{
    await AsyncStorage.removeItem("token")
    setUser(null)
    setIsLoggedIn(false)
    router.replace("/sign-in")
  }


  return (
    <SafeAreaView className="bg-white h-full dark:bg-black">
    <StatusBar style={colorScheme == "dark"? "light": "dark"} />
    <Image
    source={{uri: user.image}}
    resizeMode='cover'
    />
    <View>
    <View className="w-full  items-center mt-6 mb-12 px-4">
          <TouchableOpacity
          className="w-full items-end px-4"
          onPress={logOut}
          >
            <Image
            source={icons.logout}
            resizeMode='contain'
            className="w-6 h-6"
            />
          </TouchableOpacity>

          <View className="w-16 h-16 border border-gray-600 rounded-lg justify-center items-center">
            <Image
            source={{uri: user?.image}}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode='cover'
            />
          </View>
          <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          textStyles="text-lg "
          />

          <View className="mt-5 flex-row">
            <InfoBox
            title={ 0}
            subtitle="Posts"
            containerStyles="mr-10"
            textStyles="text-xl "
            />

          <InfoBox
          title="1.2k"
          subtitle="Followers"
          textStyles="text-xl"
          />

          </View>
          <View className=" flex flex-row justify-between items-center mt-3">
            <Text className="text-md font-psemibold text-black dark:text-white">Dark mode</Text>
          <Switch value={colorScheme == "dark"}
          onChange={toggleColorScheme}
          />
          </View>
        </View>
    </View>
    </SafeAreaView>
  )
}

export default Profile