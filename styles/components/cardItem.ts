import { StyleSheet } from "react-native"
import Utils from "@/components/lib/Utils"

const cardItemStyle = StyleSheet.create({
  cardItem: {
    display: "flex",
    flexDirection: "column",
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
    backgroundColor: "white",
  },
  title: {
    fontSize: Utils.moderateScale(16),
    fontWeight: "bold",
  },
})

export default cardItemStyle
