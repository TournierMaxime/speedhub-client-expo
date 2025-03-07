import React from "react"
import Utils from "./Utils"
import { DimensionValue, StyleProp, Text, TextStyle } from "react-native"

interface Props {
  data: any
  width?: DimensionValue
  height?: DimensionValue
  style?: StyleProp<TextStyle>
  idx?: number
}

const UserName: React.FC<Props> = ({ data, idx, width, height, style }) => {
  return (
    <Text
      key={idx}
      style={[
        {
          fontSize: Utils.moderateScale(16),
          fontWeight: "bold",
          textAlign: "left",
        },
        style,
      ]}
    >
      {data}
    </Text>
  )
}

export default UserName
