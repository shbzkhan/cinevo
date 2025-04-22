import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title, subtitle, containerStyles, textStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-black text-center font-psemibold dark:text-white ${textStyles}`}>{title}</Text>
      <Text className="text-sm text-gray-600 text-center font-psemibold dark:text-gray-400">{subtitle}</Text>
    </View>
  )
}

export default InfoBox