import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const profileStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#dadada",
    paddingHorizontal: Utils.moderateScale(10),
    paddingVertical: Utils.moderateScale(15),
  },
  itemText: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
  },
  logout: {
    display: "flex",
    alignItems: "center",
  },
  logoutText: {
    fontSize: Utils.moderateScale(18),
    color: "red",
    fontWeight: "bold",
    paddingHorizontal: Utils.moderateScale(10),
    paddingVertical: Utils.moderateScale(15),
  },
})

export default profileStyle
