import React from 'react'
import { Link } from 'expo-router'
import { View, Text } from 'react-native'

export default function SignIn() {
  return (
      <View>
          <Text>Sign-In</Text>
          <Link href={"/"}>Index</Link>
      </View>
  )
}
