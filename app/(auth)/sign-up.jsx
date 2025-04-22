import { View, Text, Image, Alert, ToastAndroid, Platform } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import {images} from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton.jsx"
import { Link, router} from 'expo-router'
import { createUser } from '../../lib/appwrite.js'
import { useGlobalContext } from '../../context/GlobalProvider'
import axios from 'axios'
const SignUp = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })


  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submit = async() =>{
    if(!form.username || !form.email || !form.password){
      return Alert.alert(
        "Error",
        "please fill in all the fields"
      )
    }
    setIsSubmitting(true)
   try {
    const signupData ={
      username:form.username,
      email: form.email,
      password:form.password

    }

    const {data} = await axios.post(`${process.env.EXPO_PUBLIC_MONGODB}/signup`,
      signupData, 
      {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("User Sign Up :", data)
    if (data.success) {
      
      router.push("/sign-in")
      setUser(data.user)
      setIsLoggedIn(true)
      if (Platform.OS === "android") {
          ToastAndroid.show(data.message, ToastAndroid.SHORT)
        }else{
          Alert.alert("Sign Up", data.message)
        }
    } else {
     if (Platform.OS === "android") {
        ToastAndroid.show(data.message, ToastAndroid.SHORT)
        }else{
          Alert.alert("Sign Up", data.message)
      }
      router.push("/sign-in")
    }
    console.log('Response:', data);
    //express backend code end

   } catch (error) {
    const message = error.response.data.message
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT)
    }else{
      Alert.alert("Sign Up", message)
    }
    console.log("ERROR", message);
    
   } finally {
    setIsSubmitting(false)
   }
  }
  return (
    <SafeAreaView className="bg-white h-full dark:bg-black">
    <ScrollView>
      <View className="w-full justify-center h-full px-4
      my-6">
        <Image
        source={images.logo}
        resizeMode='contain'
        className="w-[195px] h-[115px] mx-auto"
        />
        <Text className="text-2xl text-black text-semibold mt-10 font-psemibold dark:text-white">Sign up to Cinevo</Text>
        
        <FormField
        title="Username"
        placeholder="Enter username"
        value = {form.username}
        handleChangerText={(e)=>setForm({...form, username: e})}
        otherStyles="mt-10"
        />
        <FormField
        title="Email"
        placeholder="Enter email"
        value = {form.email}
        handleChangerText={(e)=>setForm({...form, email: e})}
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
        title="Sign up"
        handlePress={submit}
        containerStyles="mt-11"
        isLoading={isSubmitting}
        />
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-700 font-pregular dark:text-gray-300">
            Have an account already?
          </Text>
          <Link href="/sign-in" className='text-lg font-psemibold text-blue-600'>Sign in</Link>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default SignUp