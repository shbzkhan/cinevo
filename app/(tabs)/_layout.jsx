import { View, Text, Image } from 'react-native'
import React from 'react'
import {icons} from "../../constants"
import {Tabs, Redirect } from "expo-router"
import { useGlobalContext } from '../../context/GlobalProvider'


const TabIcon = ({icon, color, focused,buttonStyle}) =>{
    return (
        <View>
            <Image
            source={icon}
            resizeMode='contain'
            tintColor={color}
            className = {`w-6 h-6 ${buttonStyle}`}
            />
        </View>
    )
}

const TabsLayout = () => {
    const{user, colorScheme} = useGlobalContext()
  return (
   <Tabs
   screenOptions={{
    tabBarShowLabel: false,
    tabBarActiveTintColor: colorScheme == "dark"?"#FFFFFF":"black", 
    tabBarInactiveTintColor: colorScheme == "dark"?"#757575":"#757575",
    tabBarStyle: {
        backgroundColor: colorScheme == "dark"?"black":"#FFFFFF",
        paddingTop:9,
        borderTopColor: colorScheme == "dark"?"#212121":"#E0E0E0",
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
            <TabIcon icon={ {uri:user.image}|| icons.profile}
            //  color = {color}
            focused={focused}
            buttonStyle = "rounded-full w-8 h-8"
            />
        )
    }}
    />
   </Tabs>
  )
}

export default TabsLayout