import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const Loader = ({title}) => {
  return (
    <View className=" bg-transparent h-full w-full flex items-center justify-center  absolute top-0 right-0 z-10">
            <View className="bg-black-100 dark:bg-white opacity-30 h-full w-full">
            </View>
                <View className="bg-white dark:bg-black-200 h-20 w-80 absolute buttom-50 z-50 flex flex-row gap-x-3 items-center pl-5 rounded-md">
                    <ActivityIndicator size={'large'}/>
                  <Text className="text-md text-black dark:text-white">{title}</Text>
                </View>
            </View>
  )
}

export default Loader