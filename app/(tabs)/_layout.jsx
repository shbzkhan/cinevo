import { View, Text, Image } from 'react-native'
import React from 'react'
import {icons} from "../../constants"
import {Tabs, Redirect } from "expo-router"

const TabIcon = ({icon, color, focused}) =>{
    return (
        <View>
            <Image
            source={icon}
            resizeMode='contain'
            tintColor={color}
            className = "w-6 h-6"
            />
        </View>
    )
}

const TabsLayout = () => {
  return (
   <Tabs
   screenOptions={{
    tabBarShowLabel: false,
    tabBarActiveTintColor: "#FfA001",
    tabBarInactiveTintColor: "#CDCDE0",
    tabBarStyle: {
        backgroundColor: "#161622",
        borderTopWidth: 1,
        borderTopColor: "#232533"
    }
   }}
   >
    <Tabs.Screen
    name='home'
    options={{
        headerShown: false,
        tabBarIcon: ({color, focused}) =>(
            <TabIcon icon={icons.home}
            color = {color}
            focused={focused}
            />
        )
    }}
    />

<Tabs.Screen
    name='bookmark'
    options={{
        headerShown: false,
        tabBarIcon: ({color, focused}) =>(
            <TabIcon icon={icons.bookmark}
            color = {color}
            focused={focused}
            />
        )
    }}
    />
    <Tabs.Screen
    name='create'
    options={{
        headerShown: false,
        tabBarIcon: ({color, focused}) =>(
            <TabIcon icon={icons.plus}
            color = {color}
            focused={focused}
            />
        )
    }}
    />
    <Tabs.Screen
    name='profile'
    options={{
        headerShown: false,
        tabBarIcon: ({color, focused}) =>(
            <TabIcon icon={icons.profile}
            color = {color}
            focused={focused}
            />
        )
    }}
    />
   </Tabs>
  )
}

export default TabsLayout