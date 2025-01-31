import { StyleSheet } from "react-native"
import Utils from "@/components/lib/Utils"
import { Colors } from "@/constants/Colors"

const cardStyle = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginHorizontal: "auto",
    alignSelf: "auto",
    marginTop: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    borderColor: "grey",
    /*     shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5), */
    paddingVertical: Utils.moderateScale(10),
  },
  cardText: {
    fontSize: Utils.moderateScale(16),
    paddingVertical: Utils.moderateScale(10),
    textAlign: "justify",
    width: "90%",
  },
  cardItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Utils.moderateScale(10),
  },
  cardImage: {
    display: "flex",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    marginLeft: Utils.moderateScale(10),
    width: "50%",
  },
  cardInfoItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Utils.moderateScale(5),
  },
  image: {
    width: Utils.moderateScale(80),
    height: Utils.moderateScale(80),
    resizeMode: "contain",
    borderRadius: Utils.moderateScale(5),
  },
  username: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
  },
  text: {
    fontSize: Utils.moderateScale(16),
    textAlign: "justify",
  },
  title: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
    padding: Utils.moderateScale(10),
  },
  icons: {
    display: "flex",
    justifyContent: "flex-start",
  },
  data: {
    flex: 1,
    alignItems: "flex-end",
  },
})

export default cardStyle
