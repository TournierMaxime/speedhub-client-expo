import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import Utils from "@/components/lib/Utils"
import { useGlobalSearchParams } from "expo-router"
import { useInfiniteQuery } from "@tanstack/react-query"
import { PersonalBests } from "@/types/sdc"
import { userService } from "@/services/speedrunDotCom"
import Runtime from "@/components/lib/RunTime"
import { useColorScheme } from "react-native"
import ROUTES from "@/components/routes"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import { pbStyle } from "@/styles/views/oneUser"

const PersonalBestsUser = () => {
  const { id } = useGlobalSearchParams()

  const theme = useColorScheme() ?? "light"

  const { handleRedirect } = useHandleRouter()

  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ["getPersonalBests"],
    queryFn: async () => {
      return await userService.getPersonalBests(id)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
  })

  if (error) {
    return <CatchError error={error} />
  }

  const [personalBest, setPersonalBest] = useState<PersonalBests["data"]>([])

  const getPlace = (place: number, assets: any) => {
    switch (place) {
      case 1:
        return (
          <Text style={pbStyle.textCard}>
            <Image
              source={{ uri: assets["trophy-1st"]?.uri }}
              style={pbStyle.trophy}
            />
            {place}st place
          </Text>
        )
      case 2:
        return (
          <Text style={pbStyle.textCard}>
            <Image
              source={{ uri: assets["trophy-2nd"]?.uri }}
              style={pbStyle.trophy}
            />
            {place}nd place
          </Text>
        )
      case 3:
        return (
          <Text style={pbStyle.textCard}>
            <Image
              source={{ uri: assets["trophy-3rd"]?.uri }}
              style={pbStyle.trophy}
            />
            {place}rd place
          </Text>
        )
      default:
        return <Text style={pbStyle.textCard}>{place}th place</Text>
    }
  }

  const personalBests = () => {
    if (personalBest.length > 0) {
      const getPersonalBests = personalBest.map((pb, idx) => {
        return (
          <TouchableOpacity
            key={idx}
            style={pbStyle.card}
            onPress={async () =>
              await handleRedirect(ROUTES.ONE_RUN, { id: pb.run.id })
            }
          >
            <View style={pbStyle.cardImage}>
              <Image
                style={pbStyle.image}
                source={{ uri: pb.game.data.assets["cover-large"].uri }}
              />
            </View>
            <View style={pbStyle.cardInfo}>
              <Text style={pbStyle.textCard}>
                {pb.game.data.names.international}
              </Text>
              <Text style={pbStyle.textCard}>{pb.category.data.name}</Text>
              <Runtime
                time={pb.run.times.primary_t}
                css={{ marginLeft: Utils.moderateScale(10) }}
              />
              {getPlace(pb.place, pb.game.data.assets)}
            </View>
          </TouchableOpacity>
        )
      })
      return getPersonalBests
    }
    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.data)
      setPersonalBest(mergedData)
    }
  }, [data])

  return (
    <View style={pbStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : personalBests()}
    </View>
  )
}

export default PersonalBestsUser
