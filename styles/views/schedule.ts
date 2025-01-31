import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const scheduleStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    marginTop: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    padding: Utils.moderateScale(10),
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
    backgroundColor: "#fff", // adapt theme
  },
  title: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: Utils.moderateScale(16),
  },
  header: {
    display: "flex",
    flexDirection: "column",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Utils.moderateScale(10),
  },
})

export default scheduleStyle
