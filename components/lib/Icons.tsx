import React from "react"
import {
  Entypo,
  Ionicons,
  FontAwesome5,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Feather,
} from "@expo/vector-icons"
import Utils from "./Utils"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

const Chevron = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <Entypo
      name="chevron-right"
      size={Utils.moderateScale(24)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

const LeftArrow = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <Ionicons
      name="arrow-back-outline"
      size={Utils.moderateScale(25)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

const User = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <FontAwesome5
      name="user"
      size={Utils.moderateScale(25)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

const Search = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <FontAwesome
      name="search"
      size={Utils.moderateScale(25)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

const Runner = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <MaterialCommunityIcons
      name="run"
      size={Utils.moderateScale(28)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

const GamePad = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <MaterialIcons
      name="gamepad"
      size={Utils.moderateScale(24)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

const Category = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <MaterialIcons
      name="category"
      size={Utils.moderateScale(24)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

const Time = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <MaterialIcons
      name="access-time"
      size={Utils.moderateScale(24)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

const Comment = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <FontAwesome
      name="comment-o"
      size={Utils.moderateScale(24)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

const Filter = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <AntDesign
      name="filter"
      size={Utils.moderateScale(24)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

const Discord = () => {
  return (
    <FontAwesome6
      name="discord"
      size={Utils.moderateScale(20)}
      color={"white"}
    />
  )
}

const VideoCam = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <Feather
      name="video"
      size={Utils.moderateScale(24)}
      color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
    />
  )
}

export {
  VideoCam,
  Discord,
  Chevron,
  LeftArrow,
  User,
  Search,
  Runner,
  GamePad,
  Category,
  Time,
  Comment,
  Filter,
}
