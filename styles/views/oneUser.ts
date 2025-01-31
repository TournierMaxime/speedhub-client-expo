import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const oneUserStyle = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  cardUser: {
    display: "flex",
    flexDirection: "row",
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
    backgroundColor: "#fff", //adapt theme
  },
  cardImage: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
  },
  image: {
    width: Utils.moderateScale(80),
    height: Utils.moderateScale(80),
  },
  textCard: {
    fontSize: Utils.moderateScale(16),
  },
})

const pbStyle = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: Utils.moderateScale(10),
  },
  card: {
    display: "flex",
    flexDirection: "row",
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
    backgroundColor: "#fff", //adapt theme
  },
  cardImage: {
    display: "flex",
    flexDirection: "column",
    width: "20%",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    flexWrap: "wrap",
  },
  image: {
    width: Utils.moderateScale(80),
    height: Utils.moderateScale(80),
    resizeMode: "contain",
    borderRadius: Utils.moderateScale(5),
  },
  trophy: {
    width: Utils.moderateScale(20),
    height: Utils.moderateScale(20),
    resizeMode: "contain",
  },
  textCard: {
    fontSize: Utils.moderateScale(16),
    marginLeft: Utils.moderateScale(10),
    width: "95%",
  },
})

export { oneUserStyle, pbStyle }
