import React from "react"
import { View, StyleProp, ViewStyle } from "react-native"

interface Props<T> {
  item: T
  style?: StyleProp<ViewStyle>
  renderProperty: (item: T) => React.ReactNode
}

const RenderItem = <T,>({ item, style, renderProperty }: Props<T>) => {
  return <View style={style}>{renderProperty(item)}</View>
}

export default RenderItem
