import React from 'react'
import { View, Text } from 'react-native'

interface Props {
    error: any
}

const Error: React.FC<Props> = ({ error }) => {
    if (error)
        return (
            <View>
                <Text>{error}</Text>
            </View>
        )
}

export default Error
