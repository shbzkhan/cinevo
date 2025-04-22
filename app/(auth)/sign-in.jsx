import { View, Text, Image, Alert, Platform, ToastAndroid } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import {images} from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton.jsx"
import { Link } from 'expo-router'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'

const SignIn = () => {
  const {setUser, setIsLoggedIn, colorScheme} = useGlobalContext()
  const [form, setForm] = useState({
    emailOrUsername: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () =>{
    if(!form.emailOrUsername || !form.password){
      return Alert.alert(
        "Error",
        "please fill in all the fields"
      )
    }
    setIsSubmitting(true)
   try {


    const signinData ={
      emailOrUsername: form.emailOrUsername,
      password:form.password

    }

    const {data} = await axios.post(`${process.env.EXPO_PUBLIC_MONGODB}/signin`, signinData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    // const data = response.data
    if (data.success) {
          await AsyncStorage.setItem("token", data.token);
          setIsLoggedIn(true)
          setUser(data.user)

          if (Platform.OS === "android") {
            ToastAndroid.show(data.message, ToastAndroid.SHORT)
          }else{
             Alert.alert("Login", data.message)
          }
           router.replace("/home")

        } else {
          if (Platform.OS === "android") {
            ToastAndroid.show(data.message, ToastAndroid.SHORT)
          }else{
             Alert.alert("Login", data.message)
          }
        }
    //express backend code end

   } catch (error) {
     const message = error.response.data.message
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT)
    }else{
       Alert.alert("Login", message)
    }

    
   } finally {
    setIsSubmitting(false)
   }
  }

  //bg-primary to bg-white
  //text-white to text-black
  return (
    <SafeAreaView className="bg-white h-full dark:bg-black">
      <StatusBar style={colorScheme=="dark"?"light":"dark"}/>
    <ScrollView>
      <View className="w-full justify-center h-full px-4
      my-6 ">
        <Image
        source={images.logo}
        resizeMode='contain'
        className="w-[215px] h-[135px] mx-auto"
        />
        <Text className="text-2xl text-black text-semibold mt-10 font-psemibold dark:text-white">Log in to Cinevo</Text>
        
        <FormField
        title="Email or username"
        placeholder="Enter email or username"
        value = {form.emailOrUsername}
        handleChangerText={(e)=>setForm({...form, emailOrUsername: e})}
        // handleChangerText={(e)=>useremail(e)}
        otherStyles="mt-7"
        keyboardType="email-address"
        />

        <FormField
        title="Password"
        placeholder="Enter password"
        value = {form.password}
        handleChangerText={(e)=>setForm({...form, password: e})}
        otherStyles="mt-7"
        />
        <CustomButton
        title="Sign in"
        handlePress={submit}
        containerStyles="mt-11"
        isLoading={isSubmitting}
        />
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-700 font-pregular dark:text-gray-300">
            Don't have Account?
          </Text>
          <Link href="/sign-up" className='text-lg font-psemibold text-blue-600'>Sign up</Link>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default SignIn