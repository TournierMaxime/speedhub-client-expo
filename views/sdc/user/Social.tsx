import cardItemStyle from "@/styles/components/cardItem"
import { GetUserSummaryUserSocialConnectionList } from "@/types/sdc"
import React from "react"
import { FlatList, Text, View } from "react-native"

const Social = ({
  social,
}: {
  social: GetUserSummaryUserSocialConnectionList[]
}) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: GetUserSummaryUserSocialConnectionList
    index: number
  }) => {
    return (
      <View key={index} style={cardItemStyle.cardItem}>
        <Text style={cardItemStyle.title}>{item.value}</Text>
      </View>
    )
  }
  return <FlatList data={social} renderItem={renderItem} />
}

export default Social
