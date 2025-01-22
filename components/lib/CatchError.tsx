import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from './Header'

interface Props {
    error: any
}

const CatchError: React.FC<Props> = ({ error }) => {
    if (error)
        return (
            <View style={style.container}>
                <Header backButton={true} title="Error" />
                <Text>{error}</Text>
            </View>
        )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#fff",
        height: "100%",
    }
})

export default CatchError
