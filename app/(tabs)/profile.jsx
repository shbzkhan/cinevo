import { View,FlatList, TouchableOpacity, Image, ActivityIndicator} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import { StatusBar } from 'expo-status-bar'
import {getUserPosts} from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { signOut } from '../../lib/appwrite'
import { router } from 'expo-router'

const Profile = () => {
  const {user, setUser, setIsLoggedIn}= useGlobalContext()
const {data: posts} = useAppwrite(
  ()=> getUserPosts(user.$id)
)
  const logOut = async()=>{
    await signOut()
    setUser(null)
    setIsLoggedIn(false)


    router.replace("/sign-in")
  }
  return (
    <SafeAreaView className="bg-primary h-full">
    <StatusBar style='light' />
      <FlatList
      data={posts}
      keyExtractor={(item)=>{item.$id}}
      renderItem={({item})=>(
          <VideoCard video={item}/>
      )}
      ListHeaderComponent={(item)=>(
        <View className="w-full justify-center items-center mt-6 mb-12 px-4">
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

          <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
            <Image
            source={{uri: user?.avatar}}
            className="w-[90%] h-[90%] rounded-lg"
            resizeMode='cover'
            />
          </View>
          <InfoBox
          title={user?.username}
          containerStyles="mt-5"
          textStyles="text-lg"
          />

          <View className="mt-5 flex-row">
            <InfoBox
            title={posts.length || 0}
            subtitle="Posts"
            containerStyles="mr-10"
            textStyles="text-xl"
            />

          <InfoBox
          title="1.2k"
          subtitle="Followers"
          textStyles="text-xl"
          />

          </View>

        </View>
      )}
      ListEmptyComponent={()=>(
        <EmptyState
        title="No video founded"
        subtitle="No videos found for this search query"
        
        />
      )}
      />
    </SafeAreaView>
  )
}

export default Profile