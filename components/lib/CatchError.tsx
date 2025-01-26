import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Utils from "./Utils"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

interface Props {
  error: any
}

const CatchError: React.FC<Props> = ({ error }) => {
  const theme = useColorScheme() ?? "light"

  if (error)
    return (
      <View
        style={[
          style.container,
          theme === "dark"
            ? { backgroundColor: Colors.dark.background }
            : { backgroundColor: Colors.light.background },
        ]}
      >
        <View style={style.titleContainer}>
          <Text style={style.title}>Error</Text>
        </View>
        <View
          style={[
            style.contentContainer,
            theme === "dark"
              ? { backgroundColor: Colors.dark.background }
              : { backgroundColor: Colors.light.background },
          ]}
        >
          <Text
            style={[
              style.content,
              theme === "dark"
                ? { color: Colors.dark.text }
                : { color: Colors.light.text },
            ]}
          >
            {error.message ?? "Message"}
          </Text>
        </View>
      </View>
    )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "95%",
    margin: "auto",
    marginTop: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    borderColor: "grey",
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
  },
  titleContainer: {
    backgroundColor: "red",
    borderTopLeftRadius: Utils.moderateScale(5),
    borderTopRightRadius: Utils.moderateScale(5),
  },
  contentContainer: {
    borderBottomLeftRadius: Utils.moderateScale(5),
    borderBottomRightRadius: Utils.moderateScale(5),
  },
  title: {
    fontSize: Utils.moderateScale(18),
    padding: Utils.moderateScale(5),
    color: "white",
    fontWeight: "bold",
  },
  content: {
    fontSize: Utils.moderateScale(16),
    padding: Utils.moderateScale(5),
  },
})

export default CatchError
