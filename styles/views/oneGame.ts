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
  backgroungImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
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
    width: "95%",
    position: "absolute",
    top: Utils.moderateScale(10),
    backgroundColor: "#cacaca",
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(5),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
    padding: Utils.moderateScale(10),
  },
  collapsiblesContainer: {
    position: "absolute",
    width: "95%",
    alignSelf: "center",
    padding: Utils.moderateScale(10),
    top: Utils.moderateScale(240),
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(5),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
  },
  infoContainer: {
    //marginLeft: Utils.moderateScale(10),
  },
  img: {
    width: Utils.moderateScale(200),
    height: Utils.moderateScale(200),
    resizeMode: "contain",
  },
  backgroungImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  text: {
    fontSize: Utils.moderateScale(20),
  },
  externalLinkContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  sdcContainer: {
    backgroundColor: "#199c77",
    borderRadius: Utils.moderateScale(5),
    display: "flex",
    alignItems: "center",
    padding: Utils.moderateScale(5),
    marginBottom: Utils.moderateScale(5),
    width: Utils.moderateScale(80),
  },
  sdcButton: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    padding: Utils.moderateScale(10),
    fontSize: Utils.moderateScale(16),
  },
  discordContainer: {
    backgroundColor: "#7289da",
    borderRadius: Utils.moderateScale(5),
    display: "flex",
    alignItems: "center",
    padding: Utils.moderateScale(5),
    width: Utils.moderateScale(80),
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
