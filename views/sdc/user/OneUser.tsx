import React, { Fragment } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { User } from "@/types/sdc"
import { userService } from "@/services/speedrunDotCom"
import PersonalBestsUser from "./PersonalBestsUser"
import moment from "moment"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import UserName from "@/components/lib/UserName"
import { oneUserStyle } from "@/styles/views/oneUser"
import ROUTES from "@/components/routes"
import { favoriteUserService } from "@/services/speedhub"
import { useAuth } from "@/contexts/AuthContext"
import useHandleFavorite from "@/hooks/user/useHandleFavorite"

const OneUser = () => {
  const { id } = useGlobalSearchParams()

  const { user } = useAuth()

  const userId = user?.userId

  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["getUser", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await userService.getUser(id)
    },
    enabled: !!id,
  })

  const { addFavorite, removeFavorite, isFollowing, setIsFollowing } =
    useHandleFavorite({
      data: {
        userId,
        type: "Runner",
        data: {
          id: data?.data.id,
          image: data?.data.assets.image.uri,
          name: data?.data.names.international,
        },
      },
    })

  const { data: favorites } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      if (!userId) return null
      const response = await favoriteUserService.searchFavorites(userId)
      const runner = response?.favorites?.data?.runners?.find(
        (r: any) => r.id === id
      )
      setIsFollowing(!!runner)
      return response.favorites.data.runners ?? []
    },
    enabled: !!userId,
  })

  if (error) {
    return <CatchError error={error} />
  }

  const getLocation = () => {
    if (data && data?.data?.location) {
      return (
        <Fragment>
          {data.data.location.country?.names?.international ? (
            <Text style={oneUserStyle.textCard}>
              {data.data.location.country?.names?.international}
            </Text>
          ) : null}
          {data.data.location.region?.names?.international ? (
            <Text style={oneUserStyle.textCard}>
              {data.data.location.region?.names?.international}
            </Text>
          ) : null}
        </Fragment>
      )
    }
    return null
  }

  const getUsername = (data: any) => {
    if (data) {
      return <UserName data={data} width={Utils.moderateScale(50)} />
    }
    return null
  }

  const getImage = () => {
    if (data?.data?.assets) {
      const defaultImg = require("../../../assets/images/default.png")
      return (
        <View style={oneUserStyle.cardImage}>
          {data.data.assets?.image?.uri ? (
            <Image
              source={{
                uri: data.data.assets?.image?.uri,
              }}
              style={oneUserStyle.image}
            />
          ) : (
            <Image source={defaultImg} style={oneUserStyle.image} />
          )}
          <Text style={oneUserStyle.textCard}>
            {getUsername(data.data.names.international)}
          </Text>
        </View>
      )
    }
    return null
  }

  const getSignUp = () => {
    if (data?.data?.signup) {
      return (
        <Text style={oneUserStyle.textCard}>
          {moment(data.data.signup).format("YYYY-MM-DD h:mm a") ?? null}
        </Text>
      )
    }

    return null
  }

  const followButton = () => (
    <TouchableOpacity
      style={style.followButtonContainer}
      onPress={() =>
        isFollowing ? removeFavorite.mutate() : addFavorite.mutate()
      }
    >
      <Text style={style.followText}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Text>
    </TouchableOpacity>
  )

  const oneUser = () => {
    if (data) {
      return (
        <View style={oneUserStyle.cardUser}>
          {getImage()}
          <View style={oneUserStyle.cardInfo}>
            {getLocation()}
            {getSignUp()}
            {followButton()}
          </View>
        </View>
      )
    }
    return null
  }

  return (
    <ScrollView style={oneUserStyle.container}>
      <Header backButton={true} lastPath={{ pathname: ROUTES.SEARCH }} />
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneUser()}
      <PersonalBestsUser />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  followButtonContainer: {
    backgroundColor: "black",
    padding: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
    marginTop: Utils.moderateScale(10),
  },
  followText: {
    color: "white",
    fontSize: Utils.moderateScale(16),
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default OneUser
