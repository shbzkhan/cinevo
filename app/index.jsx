import { Link } from 'expo-router'
import {Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaView>
    <View className = "flex justify-center items-center">
      <Text className = " text-3xl font-pblack ">LayoutRoot</Text>
      <Link href='/home' >Go to home</Link>
    </View>
    </SafeAreaView>
  )
}

export default App