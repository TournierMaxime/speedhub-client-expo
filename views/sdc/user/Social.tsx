import Card from "@/components/lib/Card"
import {
  GetUserSummary,
  GetUserSummaryUserSocialConnectionList,
} from "@/types/sdc"
import React from "react"
import { FlatList, Text } from "react-native"

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
      <Card key={index}>
        <Text>{item.value}</Text>
      </Card>
    )
  }
  return <FlatList data={social} renderItem={renderItem} />
}

export default Social
