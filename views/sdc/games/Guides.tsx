import React, { Fragment } from "react"
import { useQuery } from "@tanstack/react-query"
import { FlatList, Text, TouchableOpacity } from "react-native"
import { GetGuideList, GuideList, GuideUsers } from "@/types/sdc"
import { gameService } from "@/services/speedrunDotCom"
import UserName from "@/components/lib/UserName"
import Card from "@/components/lib/Card"
import { redirectAlertMessage } from "@/components/lib/AlertMessage"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"

const GetGuide = ({
  data,
  url,
}: {
  data: GuideList
  url: string | undefined
}) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        if (url) {
          const fullUrl = `https://www.speedrun.com/${url}/guides/${data.id}`
          await redirectAlertMessage(fullUrl)
        }
      }}
    >
      <Text>{data.name}</Text>
    </TouchableOpacity>
  )
}

const Guides = ({ id, url }: { id: string; url: string | undefined }) => {
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
      <Card key={index}>{url ? <GetGuide url={url} data={item} /> : null}</Card>
    )
  }

  if (error) {
    return <CatchError error={error} />
  }

  return (
    <Fragment>
      {isLoading ? (
        <IsLoading isLoading={isLoading} />
      ) : (
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
      )}
    </Fragment>
  )
}

export default Guides
