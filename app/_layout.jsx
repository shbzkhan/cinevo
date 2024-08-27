import {Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
const RootLayout = () => {
  return (
  <SafeAreaView>
    <View className = "flex justify-center items-center">
      <Text className  = "text-3xl">Welcome</Text>
    </View>
    </SafeAreaView>
  )
}

export default RootLayout;
