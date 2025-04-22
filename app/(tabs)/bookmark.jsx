import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Bookmark = () => {
  return (
    <SafeAreaView className="px-4 py-6 bg-white h-full dark:bg-black">
      <Text className="text-2xl text-black font-psemibold dark:text-white">Bookmark</Text>
    </SafeAreaView>
  )
}

export default Bookmark