import React from 'react'
import { ActivityIndicator } from 'react-native'

interface Props {
    isLoading: boolean
}

const IsLoading: React.FC<Props> = ({ isLoading }) => {
    if (isLoading === true)
        return (
            <ActivityIndicator />
        )
}

export default IsLoading
