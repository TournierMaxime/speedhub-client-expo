import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const splitsStyle = StyleSheet.create({
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: Utils.moderateScale(5),
    marginVertical: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
    backgroundColor: "white", // adapt theme
    padding: Utils.moderateScale(10),
  },
  cardSplit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSplit: {
    fontSize: Utils.moderateScale(16),
    marginVertical: Utils.moderateScale(5),
  },
  textTitle: {
    fontSize: Utils.moderateScale(18),
    marginLeft: Utils.moderateScale(5),
  },
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})

export default splitsStyle
