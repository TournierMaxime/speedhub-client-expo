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
    paddingHorizontal: Utils.moderateScale(10),
    paddingVertical: Utils.moderateScale(5),
    fontSize: Utils.moderateScale(12),
    color: "#fff",
  },
})

export default Chip
