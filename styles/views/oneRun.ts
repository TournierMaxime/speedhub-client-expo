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
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    padding: Utils.moderateScale(10),
    width: "90%",
    margin: "auto",
  },
  text: {
    fontSize: Utils.moderateScale(16),
    textAlign: "justify",
    marginLeft: Utils.moderateScale(10),
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
  },
  cardInfoItems: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    backgroundColor: "white", // adapt theme
    marginHorizontal: Utils.moderateScale(10),
    marginVertical: Utils.moderateScale(10),
  },
})

export default oneRunStyle
