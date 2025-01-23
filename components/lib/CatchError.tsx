import React from "react"
import { Text } from "react-native"

interface Props {
    error: any
}

const CatchError: React.FC<Props> = ({ error }) => {
    if (error) return <Text>{error.message}</Text>
}

export default CatchError
