import { useGlobalSearchParams } from 'expo-router'
import React from 'react'
import { View, Text, Button } from 'react-native'
import useHandleRouter from '@/hooks/utils/useHandleRouter'
import { useAuth } from "@/contexts/AuthContext"
import Header from '@/components/lib/Header'
import ROUTES from '@/components/routes'

const OneUser = () => {
    const { userId } = useGlobalSearchParams()

    const { handleReplace } = useHandleRouter()

    const { logout, user } = useAuth()

    const handleLogout = async () => {
        await logout()
        await handleReplace(ROUTES.AUTH)
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
