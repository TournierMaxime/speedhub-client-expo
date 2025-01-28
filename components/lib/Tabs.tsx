import React from "react"
import { StyleSheet } from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { NavigationIndependentTree } from "@react-navigation/native"
import Utils from "./Utils"

interface TabScreen {
  name: string
  component: React.ComponentType<any>
  props?: any
}

interface TabsProps {
  screens: TabScreen[]
}

const Tab = createMaterialTopTabNavigator()

const Tabs: React.FC<TabsProps> = ({ screens }) => {
  return (
    <NavigationIndependentTree>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: Utils.moderateScale(12),
            fontWeight: "bold",
          },
          tabBarStyle: { backgroundColor: "#dedede" },
          tabBarIndicatorStyle: { backgroundColor: "blue" },
        }}
      >
        {screens.map(({ name, component: Component, props }, idx) => (
          <Tab.Screen key={idx} name={name}>
            {() => <Component {...props} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
    </NavigationIndependentTree>
  )
}

export default Tabs
