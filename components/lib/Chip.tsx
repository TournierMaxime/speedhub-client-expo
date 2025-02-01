import React, { Fragment } from "react"
import { Text, StyleSheet, TouchableOpacity, View } from "react-native"
import Utils from "./Utils"

interface Props {
  title: string
  isSelected?: boolean
  onPress?: () => void
}

const Chip: React.FC<Props> = ({ title, isSelected, onPress }) => {
  return (
    <Fragment>
      {onPress ? (
        <TouchableOpacity
          onPress={onPress}
          style={[
            style.container,
            isSelected
              ? { backgroundColor: "blue" }
              : { backgroundColor: "grey" },
          ]}
        >
          <Text style={style.text}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <View style={[style.container, { backgroundColor: "grey" }]}>
          <Text style={style.text}>{title}</Text>
        </View>
      )}
    </Fragment>
  )
}

const style = StyleSheet.create({
  container: {
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
