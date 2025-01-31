import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const oneRedditStyle = StyleSheet.create({
  btnContainer: {
    display: "flex",
    borderRadius: Utils.moderateScale(5),
    width: "100%",
    margin: "auto",
    alignItems: "center",
    marginVertical: Utils.moderateScale(10),
    backgroundColor: "#d93a00",
  },
  btnLabel: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
    marginVertical: Utils.moderateScale(10),
    color: "white",
  },
  text: {
    fontSize: Utils.moderateScale(18),
    marginVertical: Utils.moderateScale(10),
    textAlign: "justify",
  },
  textAuthor: {
    fontSize: Utils.moderateScale(18),
    marginLeft: Utils.moderateScale(10),
  },
  author: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "90%",
  },
})

export default oneRedditStyle
