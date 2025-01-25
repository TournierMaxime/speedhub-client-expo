import React from "react"
import {
  Entypo,
  Ionicons,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
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

export { Chevron, LeftArrow, User, Search, Runner, GamePad, Category, Time }
