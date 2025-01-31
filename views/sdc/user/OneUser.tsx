import React, { Fragment } from "react"
import { View, Text, Image, ScrollView } from "react-native"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { User } from "../interface"
import { userService } from "@/services/speedrunDotCom"
import PersonalBestsUser from "./PersonalBestsUser"
import moment from "moment"
import { useColorScheme } from "react-native"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import UserName from "@/components/lib/UserName"
import { oneUserStyle } from "@/styles/views/oneUser"
import mainStyle from "@/styles/base/main"

const OneUser = () => {
  const { id } = useGlobalSearchParams()

  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["getUser", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing ID")
      return await userService.getUser(id)
    },
    enabled: !!id,
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
          <Text style={oneUserStyle.textCard}>{getUsername(data.data)}</Text>
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

  const oneUser = () => {
    if (data) {
      return (
        <View style={oneUserStyle.cardUser}>
          {getImage()}
          <View style={oneUserStyle.cardInfo}>
            {getLocation()}
            {getSignUp()}
          </View>
        </View>
      )
    }
    return null
  }

  return (
    <ScrollView style={oneUserStyle.container}>
      <Header backButton={true} />
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneUser()}
      <PersonalBestsUser />
    </ScrollView>
  )
}

export default OneUser
