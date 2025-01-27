import React, { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native"
import Utils from "@/components/lib/Utils"
import { useGlobalSearchParams } from "expo-router"
import { useInfiniteQuery } from "@tanstack/react-query"
import { PersonalBests } from "../interface"
import { userService } from "@/services/speedrunDotCom"
import Runtime from "@/components/lib/RunTime"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import ROUTES from "@/components/routes"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"

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
          <Text
            style={[
              style.textCard,
              theme === "dark"
                ? { color: Colors.dark.text }
                : { color: Colors.light.text },
            ]}
          >
            <Image
              source={{ uri: assets["trophy-1st"]?.uri }}
              style={style.trophy}
            />
            {place}st place
          </Text>
        )
      case 2:
        return (
          <Text
            style={[
              style.textCard,
              theme === "dark"
                ? { color: Colors.dark.text }
                : { color: Colors.light.text },
            ]}
          >
            <Image
              source={{ uri: assets["trophy-2nd"]?.uri }}
              style={style.trophy}
            />
            {place}nd place
          </Text>
        )
      case 3:
        return (
          <Text
            style={[
              style.textCard,
              theme === "dark"
                ? { color: Colors.dark.text }
                : { color: Colors.light.text },
            ]}
          >
            <Image
              source={{ uri: assets["trophy-3rd"]?.uri }}
              style={style.trophy}
            />
            {place}rd place
          </Text>
        )
      default:
        return (
          <Text
            style={[
              style.textCard,
              theme === "dark"
                ? { color: Colors.dark.text }
                : { color: Colors.light.text },
            ]}
          >
            {place}th place
          </Text>
        )
    }
  }

  const personalBests = () => {
    if (personalBest.length > 0) {
      const getPersonalBests = personalBest.map((pb, idx) => {
        return (
          <TouchableOpacity
            key={idx}
            style={style.card}
            onPress={async () =>
              await handleRedirect(ROUTES.ONE_RUN, { id: pb.run.id })
            }
          >
            <View style={style.cardImage}>
              <Image
                style={style.image}
                source={{ uri: pb.game.data.assets["cover-large"].uri }}
              />
            </View>
            <View style={style.cardInfo}>
              <Text
                style={[
                  style.textCard,
                  theme === "dark"
                    ? { color: Colors.dark.text }
                    : { color: Colors.light.text },
                ]}
              >
                {pb.game.data.names.international}
              </Text>
              <Text
                style={[
                  style.textCard,
                  theme === "dark"
                    ? { color: Colors.dark.text }
                    : { color: Colors.light.text },
                ]}
              >
                {pb.category.data.name}
              </Text>
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
    <View style={style.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : personalBests()}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: Utils.moderateScale(10),
  },
  card: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    marginTop: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    padding: Utils.moderateScale(10),
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
    backgroundColor: "#fff", //adapt theme
  },
  cardImage: {
    display: "flex",
    flexDirection: "column",
    width: "20%",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    flexWrap: "wrap",
  },
  image: {
    width: Utils.moderateScale(80),
    height: Utils.moderateScale(80),
    resizeMode: "contain",
    borderRadius: Utils.moderateScale(5),
  },
  trophy: {
    width: Utils.moderateScale(20),
    height: Utils.moderateScale(20),
    resizeMode: "contain",
  },
  textCard: {
    fontSize: Utils.moderateScale(16),
    marginLeft: Utils.moderateScale(10),
    width: "95%",
  },
})

export default PersonalBestsUser
