import React, { Fragment } from "react"
import { View, StyleSheet, Text, Image, ScrollView } from "react-native"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useGlobalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query"
import { User } from "../interface"
import { userService } from "@/services/speedrunDotCom"
import PersonalBestsUser from "./PersonalBestsUser"
import moment from "moment"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import UserName from "@/components/lib/UserName"

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
            <Text
              style={[
                style.textCard,
                theme === "dark"
                  ? { color: Colors.dark.text }
                  : { color: Colors.light.text },
              ]}
            >
              {data.data.location.country?.names?.international}
            </Text>
          ) : null}
          {data.data.location.region?.names?.international ? (
            <Text
              style={[
                style.textCard,
                theme === "dark"
                  ? { color: Colors.dark.text }
                  : { color: Colors.light.text },
              ]}
            >
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
        <View style={style.cardImage}>
          {data.data.assets?.image?.uri ? (
            <Image
              source={{
                uri: data.data.assets?.image?.uri,
              }}
              style={style.image}
            />
          ) : (
            <Image source={defaultImg} style={style.image} />
          )}
          <Text
            style={[
              style.textCard,
              theme === "dark"
                ? { color: Colors.dark.text }
                : { color: Colors.light.text },
            ]}
          >
            {getUsername(data.data)}
          </Text>
        </View>
      )
    }
    return null
  }

  const getSignUp = () => {
    if (data?.data?.signup) {
      return (
        <Text
          style={[
            style.textCard,
            theme === "dark"
              ? { color: Colors.dark.text }
              : { color: Colors.light.text },
          ]}
        >
          {moment(data.data.signup).format("YYYY-MM-DD h:mm a") ?? null}
        </Text>
      )
    }

    return null
  }

  const oneUser = () => {
    if (data) {
      return (
        <View
          style={[
            style.cardUser,
            theme === "dark"
              ? {
                  backgroundColor: Colors.dark.background,
                  shadowColor: Colors.dark.shadowColor,
                }
              : {
                  backgroundColor: Colors.light.background,
                  shadowColor: Colors.light.shadowColor,
                },
          ]}
        >
          {getImage()}
          <View style={style.cardInfo}>
            {getLocation()}
            {getSignUp()}
          </View>
        </View>
      )
    }
    return null
  }

  return (
    <ScrollView style={style.container}>
      <Header backButton={true} title="" />
      {isLoading ? <IsLoading isLoading={isLoading} /> : oneUser()}
      <PersonalBestsUser />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  cardUser: {
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
  },
  cardImage: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
  image: {
    width: Utils.moderateScale(80),
    height: Utils.moderateScale(80),
  },
  textCard: {
    fontSize: Utils.moderateScale(16),
  },
})

export default OneUser
