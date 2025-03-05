import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const favoriteStyle = StyleSheet.create({
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: Utils.moderateScale(10),
    borderTopWidth: Utils.moderateScale(1),
  },
  text: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
  },
  image: {
    width: Utils.moderateScale(60),
    height: Utils.moderateScale(60),
  },
  modalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: Utils.moderateScale(20),
  },
  modalText: {
    fontSize: Utils.moderateScale(16),
  },
})

export default favoriteStyle
