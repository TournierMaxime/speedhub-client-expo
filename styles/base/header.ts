import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const headerStyle = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Utils.moderateScale(10),
    paddingTop: Utils.moderateScale(30),
    width: "100%",
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
  },
  speedHubLogo: {
    resizeMode: "contain",
    width: Utils.moderateScale(120),
    height: Utils.moderateScale(80),
  },
  userImg: {
    width: Utils.moderateScale(40),
    height: Utils.moderateScale(40),
    resizeMode: "contain",
  },
  backButton: {
    marginLeft: Utils.moderateScale(10),
  },
})

export default headerStyle
