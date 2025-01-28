import { Text, type TextProps, StyleSheet } from "react-native"
import { useThemeColor } from "@/hooks/useThemeColor"
import Utils from "./lib/Utils"

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link"
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text")

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: Utils.moderateScale(16),
    lineHeight: Utils.moderateScale(24),
  },
  defaultSemiBold: {
    fontSize: Utils.moderateScale(16),
    lineHeight: Utils.moderateScale(24),
    fontWeight: "600",
  },
  title: {
    fontSize: Utils.moderateScale(32),
    fontWeight: "bold",
    lineHeight: Utils.moderateScale(32),
  },
  subtitle: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
  },
  link: {
    lineHeight: Utils.moderateScale(30),
    fontSize: Utils.moderateScale(16),
    color: "#0a7ea4",
  },
})
