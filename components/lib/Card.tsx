import React, { Fragment } from "react"
import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { Chevron } from "./Icons"
import Utils from "./Utils"
import useHandleRouter, { Pathname } from "@/hooks/utils/useHandleRouter"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

interface CardProps {
  header?: string
  children: React.ReactNode
  route: Pathname
  routeParams?: any
}

const Card: React.FC<CardProps> = ({
  header,
  children,
  route,
  routeParams,
}) => {
  const theme = useColorScheme() ?? "light"

  const { handleRedirect } = useHandleRouter()

  return (
    <Fragment>
      {header && <Text style={style.title}>{header}</Text>}
      <TouchableOpacity
        onPress={() =>
          handleRedirect(route, {
            ...routeParams,
          })
        }
        style={[
          style.cardItem,
          theme === "dark"
            ? { backgroundColor: Colors.dark.cardBackground }
            : { backgroundColor: Colors.light.background },
        ]}
      >
        {children}
        <Chevron />
      </TouchableOpacity>
    </Fragment>
  )
}

const style = StyleSheet.create({
  cardItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Utils.moderateScale(10),
    margin: Utils.moderateScale(10),
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
  title: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
    padding: Utils.moderateScale(10),
  },
})

export default Card
