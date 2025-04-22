import { Redirect, router } from 'expo-router'
import {ScrollView, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../context/GlobalProvider.js'


const App = () => {

const {isLoading, isLoggedIn} = useGlobalContext()

if (!isLoading && isLoggedIn) { //isLoggedIn no redirect to home page so temp changed
  return <Redirect href="/home" />
}


  return (
    <SafeAreaView className = "bg-white h-full">
      {/* <StatusBar style='light'/> */}
    <ScrollView contentContainerStyle={{height: "100%"}} >
      <View className="w-full justify-center items-center px-4 my-auto">
              <Image
            source ={images.logo}
            className="w-[230px] h-[184px]"
            resizeMode='contain'
        />
        {/* <Image
          source={images.cards}
          className="max-w-[380px] w-full h-[300px]"
          resizeMode='contain'
        /> */}
        <View className="relative mt-5">
          <Text className="text-3xl text-black-200 font-bold text-center">
            Discover Endless Possibilities with {' '} 
            <Text className="text-blue-700">Cinevo</Text>
            </Text>

           
        </View>
        
        <Text className="text-sm font-pregular text-gray-600 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>

        <CustomButton
        title="Continue with Email"
        handlePress ={()=>router.push("(auth)/sign-in")}
        containerStyles="w-full mt-11"
        />
      </View>
    </ScrollView> 
    <StatusBar backgroundColor="#161622"  style='light'/>
    </SafeAreaView>
  )
}

export default App