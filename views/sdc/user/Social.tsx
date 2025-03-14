import cardItemStyle from "@/styles/components/cardItem"
import {
  GetUserSummaryUserSocialConnectionList,
  SocialNetworkList,
} from "@/types/sdc"
import React from "react"
import { FlatList, Text, TouchableOpacity } from "react-native"
import { redirectAlertMessage } from "@/components/lib/AlertMessage"

const Social = ({
  social,
  networks,
}: {
  social: GetUserSummaryUserSocialConnectionList[]
  networks: SocialNetworkList[]
}) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: GetUserSummaryUserSocialConnectionList
    index: number
  }) => {
    const getNetwork = networks?.find(
      (network: SocialNetworkList) => network.id === item.networkId
    )
    const pattern = getNetwork?.pattern
    const searchTerm = pattern?.split("[id]")
    const link = searchTerm && searchTerm[0].concat(item.value)

    return (
      <TouchableOpacity
        key={index}
        style={cardItemStyle.cardItem}
        onPress={async () => {
          if (link && pattern !== "popup") {
            await redirectAlertMessage(link)
          }
        }}
      >
        <Text style={cardItemStyle.title}>{getNetwork?.name}</Text>
        <Text>{item.value}</Text>
      </TouchableOpacity>
    )
  }
  return <FlatList data={social} renderItem={renderItem} />
}

export default Social
