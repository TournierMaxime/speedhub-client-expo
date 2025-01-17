import { useGlobalSearchParams } from 'expo-router'
import React from 'react'
import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from "@/contexts/AuthContext"
import Header from '@/components/lib/Header'

const OneUser = () => {
    const { userId } = useGlobalSearchParams()

    const router = useRouter()

    const { logout, user } = useAuth()

    const handleLogout = async () => {
        await logout()
        router.replace("/(auth)")
    }

    return (
        <View>
            <Header backButton={true} title='' />
            <Text>{user?.pseudo}</Text>
            <Button title="Log Out" onPress={handleLogout} />
        </View>
    )
}

export default OneUser
