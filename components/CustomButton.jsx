import {Text, TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-black rounded-xl min-h-[62px] justify-center items-center dark:bg-white ${containerStyles} ${isLoading ? "opacity-50": ""}`}
    disabled={isLoading}
    >
        <Text className={`text-white font-psemibold text-lg dark:text-black  ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton