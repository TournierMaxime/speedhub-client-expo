import React from "react"
import { Text } from "react-native"
import Utils from "./Utils"

interface Props {
    time: number
}

const Runtime = ({ time }: Props) => {
    if (!time) return null
    if (time === 0) return null

    let hours, minutes, seconds, milliseconds

    hours = Math.floor(time / 3600)
    minutes = Math.floor((time % 3600) / 60)
    seconds = Math.floor(time % 60)
    //milliseconds = ((time % 1) * 100).toFixed(2)

    const result = `${hours > 0 ? `${hours < 10 ? "0" : ""}${hours}H ` : ""}${minutes > 0 ? `${minutes < 10 ? "0" : ""}${minutes}Min ` : ""
        }${seconds > 0 ? `${seconds < 10 ? "0" : ""}${seconds}Sec` : ""}`

    return <Text style={{ fontSize: Utils.moderateScale(16) }}>{result}</Text>
}

export default Runtime
