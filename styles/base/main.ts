import { StyleSheet } from "react-native"
import { Colors } from "@/constants/Colors"

const mainStyle = StyleSheet.create({
  container: {
    display: "flex",
  },
  themeDark: {
    backgroundColor: Colors.dark.background,
    color: Colors.dark.text,
    shadowColor: Colors.dark.shadowColor,
  },
  themeLight: {
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
    shadowColor: Colors.light.shadowColor,
  },
})

export default mainStyle
