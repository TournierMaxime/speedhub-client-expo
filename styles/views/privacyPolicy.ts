import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const privacyPolicyStyle = StyleSheet.create({
  container: {
    display: "flex",
    margin: Utils.moderateScale(10),
  },
  title: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
  },
  content: {
    fontSize: Utils.moderateScale(18),
    textAlign: "justify",
    marginVertical: Utils.moderateScale(5),
  },
})

export default privacyPolicyStyle
