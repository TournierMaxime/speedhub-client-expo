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

const Ressources = ({ id, url }: { id: string; url: string | undefined }) => {
  const {
    data: getRessources,
    isLoading,
    error,
    refetch,
  } = useQuery<GetResourceList>({
    queryKey: ["getRessources", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await gameService.getResourceList(id)
    },
    enabled: !!id,
  })

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

  if (error) {
    return <CatchError error={error} />
  }

  return (
    <Fragment>
      {isLoading ? (
        <IsLoading isLoading={isLoading} />
      ) : (
        <FlatList
          data={getRessources?.resourceList}
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
