import React from "react"
import { StyleSheet, Text, StyleProp, TextStyle } from "react-native"
import Utils from "./Utils"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

interface Props {
  time: number
  css?: StyleProp<TextStyle>
}

const Runtime = ({ time, css }: Props) => {
  const theme = useColorScheme() ?? "light"

  if (!time) return null
  if (time === 0) return null

  let hours, minutes, seconds, milliseconds

  hours = Math.floor(time / 3600)
  minutes = Math.floor((time % 3600) / 60)
  seconds = Math.floor(time % 60)
  //milliseconds = ((time % 1) * 100).toFixed(2)

  const result = `${hours > 0 ? `${hours < 10 ? "0" : ""}${hours}H ` : ""}${
    minutes > 0 ? `${minutes < 10 ? "0" : ""}${minutes}Min ` : ""
  }${seconds > 0 ? `${seconds < 10 ? "0" : ""}${seconds}Sec` : ""}`

  return (
    <Text
      style={[
        style.text,
        theme === "dark"
          ? { color: Colors.dark.text }
          : { color: Colors.light.text },
        css,
      ]}
    >
      {result}
    </Text>
  )
}

const style = StyleSheet.create({
  text: {
    fontSize: Utils.moderateScale(16),
  },
})

export default Runtime
