import React from "react"
import { useQuery } from "@tanstack/react-query"
import { FlatList, Text, View } from "react-native"
import { GetGuideList, GuideList, GuideUsers } from "@/types/sdc"
import { gameService } from "@/services/speedrunDotCom"
import UserName from "@/components/lib/UserName"
import Card from "@/components/lib/Card"

const GetGuide = ({ data }: { data: GuideList }) => {
  return (
    <View>
      <Text>{data.name}</Text>
    </View>
  )
}

const Guides = ({ id }: { id: string }) => {
  const {
    data: getGuides,
    isLoading,
    error,
    refetch,
  } = useQuery<GetGuideList>({
    queryKey: ["getGuides", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await gameService.getGuides(id)
    },
    enabled: !!id,
  })

  const getUsers = (data: GetGuideList["users"]) => {
    const users = data.map((user) => {
      return user
    })
    const user = users.find(
      (u, idx) => u.id === getGuides?.guideList[idx].userId
    )
    return user ? getUser(user) : null
  }

  const getUser = (data: GuideUsers) => {
    return <UserName data={data.name} />
  }

  const renderItem = ({ item, index }: { item: GuideList; index: number }) => {
    return (
      <Card key={index}>
        <GetGuide data={item} />
      </Card>
    )
  }

  return (
    <FlatList
      data={getGuides?.guideList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      nestedScrollEnabled={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      removeClippedSubviews={true}
      windowSize={5}
    />
  )
}

export default Guides
