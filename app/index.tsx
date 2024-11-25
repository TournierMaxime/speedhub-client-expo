import { Link } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

export default function Index() {
  return (
      <View>
          <Text>Index</Text>
          <Link href={"/profile"}>Profile</Link>
          <Link href={"/sign-in"}>Sign-In</Link>
      </View>
  )
}
