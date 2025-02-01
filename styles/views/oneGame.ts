import Utils from "@/components/lib/Utils"
import { StyleSheet } from "react-native"

const oneGameStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const oneGameTabsStyle = StyleSheet.create({
  text: {
    fontSize: Utils.moderateScale(16),
  },
  tabContent: {
    flex: 1,
    marginVertical: Utils.moderateScale(10),
  },
  tags: {
    backgroundColor: "#fff",
    padding: Utils.moderateScale(5),
    marginVertical: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
    fontSize: Utils.moderateScale(16),
  },
  leaderboardContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    marginVertical: Utils.moderateScale(10),
  },
  categoryTitle: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
    marginBottom: Utils.moderateScale(10),
  },
  variableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Utils.moderateScale(5),
  },
  variableTitle: {
    fontSize: Utils.moderateScale(14),
    fontWeight: "bold",
  },
  variableValue: {
    fontSize: Utils.moderateScale(14),
    fontStyle: "italic",
  },
  runContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E0E0E0",
    padding: Utils.moderateScale(5),
    marginVertical: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
  },
  runPlace: {
    fontSize: Utils.moderateScale(16),
    fontWeight: "bold",
  },
  runTime: {
    fontSize: Utils.moderateScale(16),
  },
})

const oneGameDetailsStyle = StyleSheet.create({
  contentContainer: {
    display: "flex",
    width: "100%",
    marginHorizontal: "auto",
  },
  gameContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    borderRadius: Utils.moderateScale(5),
  },
  modalContainer: {
    width: "100%",
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  img: {
    width: Utils.moderateScale(140),
    height: Utils.moderateScale(180),
    resizeMode: "cover",
    borderRadius: Utils.moderateScale(10),
  },
  backgroungImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: Utils.moderateScale(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  gameTitle: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
    color: "#fff",
    marginVertical: Utils.moderateScale(10),
  },
  subTitle: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
    marginLeft: Utils.moderateScale(10),
    marginTop: Utils.moderateScale(10),
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  infoContent: {
    display: "flex",
    flexDirection: "row",
  },
  buttonContainer: {
    backgroundColor: "#199c77",
    borderRadius: Utils.moderateScale(5),
    display: "flex",
    alignItems: "center",
    padding: Utils.moderateScale(5),
    width: Utils.moderateScale(80),
    margin: Utils.moderateScale(10),
  },
  sdcButton: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: Utils.moderateScale(10),
    fontSize: Utils.moderateScale(16),
  },
  discordButton: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: Utils.moderateScale(10),
    fontSize: Utils.moderateScale(16),
  },
  tabContent: {
    flex: 1,
    padding: Utils.moderateScale(10),
    marginVertical: Utils.moderateScale(10),
  },
  tags: {
    backgroundColor: "#E0E0E0",
    padding: Utils.moderateScale(5),
    margin: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
    fontSize: Utils.moderateScale(16),
  },
  text: {
    fontSize: Utils.moderateScale(16),
  },
})

const oneGameLeaderBoardStyle = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingVertical: Utils.moderateScale(5),
    marginHorizontal: Utils.moderateScale(10),
  },
  trophyContainer: {
    width: "15%",
  },
  trophy: {
    width: Utils.moderateScale(20),
    height: Utils.moderateScale(20),
    resizeMode: "contain",
  },
  player: {
    fontSize: Utils.moderateScale(16),
    width: "40%",
  },
  time: {
    fontSize: Utils.moderateScale(16),
    width: "30%",
  },
  icon: {
    width: "15%",
  },
})

export {
  oneGameStyle,
  oneGameDetailsStyle,
  oneGameTabsStyle,
  oneGameLeaderBoardStyle,
}
