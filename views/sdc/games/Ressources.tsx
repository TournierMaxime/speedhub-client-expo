import React, { Fragment } from "react"
import { useQuery } from "@tanstack/react-query"
import { FlatList, Text, TouchableOpacity } from "react-native"
import { GetResourceList, ResourceList } from "@/types/sdc"
import { gameService } from "@/services/speedrunDotCom"
import UserName from "@/components/lib/UserName"
import Card from "@/components/lib/Card"
import { redirectAlertMessage } from "@/components/lib/AlertMessage"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"

const GetRessource = ({
  data,
  url,
}: {
  data: ResourceList
  url: string | undefined
}) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        if (url) {
          const fullUrl = `https://www.speedrun.com/${url}/resources/${data.id}`
          await redirectAlertMessage(fullUrl)
        }
      }}
    >
      <Text>{data.name}</Text>
    </TouchableOpacity>
  )
}

const Ressources = ({
  id,
  url,
  data,
}: {
  id: string
  url: string | undefined
  data: GetResourceList
}) => {
  const getAuthor = (data: ResourceList) => {
    return <UserName data={data.authorNames} />
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: ResourceList
    index: number
  }) => {
    return (
      <Card key={index}>
        {url ? <GetRessource url={url} data={item} /> : null}
      </Card>
    )
  }

  return (
    <Fragment>
      {!data ? null : (
        <FlatList
          data={data?.resourceList}
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

export default Ressources
