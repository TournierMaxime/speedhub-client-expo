import Header from '@/components/lib/Header'
import React from 'react'
import { View, Text } from 'react-native'
import { useGlobalSearchParams } from 'expo-router'

const OneGame = () => {
    const { id } = useGlobalSearchParams()
    return <View>
        <Header backButton={true} title='' />
        <Text>{id}</Text>
    </View>
}

export default OneGame
