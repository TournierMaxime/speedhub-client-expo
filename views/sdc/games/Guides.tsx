import React, { Fragment } from "react"
import { FlatList, Text, TouchableOpacity } from "react-native"
import { GetGuideList, GuideList, GuideUsers } from "@/types/sdc"
import UserName from "@/components/lib/UserName"
import Card from "@/components/lib/Card"
import { redirectAlertMessage } from "@/components/lib/AlertMessage"

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

const Guides = ({
  id,
  url,
  data,
}: {
  id: string
  url: string | undefined
  data: GetGuideList
}) => {
  const guideList = data.guideList

  const getUsers = (data: GetGuideList["users"]) => {
    const users = data.map((user) => {
      return user
    })
    const user = users.find((u, idx) => u.id === guideList[idx].userId)
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

  return (
    <Fragment>
      {!data ? null : (
        <FlatList
          data={data?.guideList}
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
