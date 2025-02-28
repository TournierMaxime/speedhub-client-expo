import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const oneRunStyle = StyleSheet.create({
  img: {
    width: Utils.moderateScale(60),
    height: Utils.moderateScale(60),
    resizeMode: "contain",
    marginHorizontal: Utils.moderateScale(5),
  },
  playerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: Utils.moderateScale(10),
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    padding: Utils.moderateScale(10),
  },
  text: {
    fontSize: Utils.moderateScale(16),
    textAlign: "justify",
    marginLeft: Utils.moderateScale(10),
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    //alignItems: "center",
    padding: Utils.moderateScale(5),
  },
  cardInfoItems: {
    display: "flex",
    flexDirection: "column",
    //flexWrap: "wrap",
    borderRadius: Utils.moderateScale(5),
    backgroundColor: "white", // adapt theme
    marginHorizontal: Utils.moderateScale(10),
  },
})

export default oneRunStyle
