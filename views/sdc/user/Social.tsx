import cardItemStyle from "@/styles/components/cardItem"
import {
  GetStaticData,
  GetUserSummaryUserSocialConnectionList,
  SocialNetworkList,
} from "@/types/sdc"
import React from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { generalService } from "@/services/speedrunDotCom"
import { useQuery } from "@tanstack/react-query"
import { redirectAlertMessage } from "@/components/lib/AlertMessage"

const Social = ({
  social,
}: {
  social: GetUserSummaryUserSocialConnectionList[]
}) => {
  const { data, isLoading, error, refetch } = useQuery<GetStaticData>({
    queryKey: ["getStaticData"],
    queryFn: async () => {
      return await generalService.getStaticData()
    },
  })

  const networks: SocialNetworkList[] | undefined = data?.socialNetworkList

  console.log(networks)

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
    console.log(link)

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
