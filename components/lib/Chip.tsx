import React from "react"
import { Text, View, StyleSheet } from "react-native"
import Utils from "./Utils"

interface Props {
  title: string
}

const Chip: React.FC<Props> = ({ title }) => {
  return (
    <View style={style.container}>
      <Text style={style.text}>{title}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    borderRadius: Utils.moderateScale(20),
    margin: Utils.moderateScale(10),
  },
  text: {
    padding: Utils.moderateScale(10),
    fontSize: Utils.moderateScale(16),
    color: "#fff",
  },
})

export default Chip
