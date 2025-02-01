import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const searchStyle = StyleSheet.create({
  container: {
    display: "flex",
    alignSelf: "auto",
    width: "100%",
    borderColor: "grey",
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
    padding: Utils.moderateScale(10),
  },
  searchForm: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  submitButton: {
    display: "flex",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginLeft: Utils.moderateScale(20),
    marginVertical: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
    padding: Utils.moderateScale(10),
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
  },
  cardItem: {
    display: "flex",
    alignItems: "center",
    padding: Utils.moderateScale(10),
    marginVertical: Utils.moderateScale(10),
    fontSize: Utils.moderateScale(16),
    fontWeight: "bold",
    textAlign: "left",
  },
  cardLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: Utils.moderateScale(80),
    height: Utils.moderateScale(80),
    resizeMode: "contain",
  },
  optionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})

export default searchStyle
