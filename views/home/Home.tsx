import { ScrollView, Text, StyleSheet, View } from "react-native"
import Header from "@/components/lib/Header"
import MarathonLivesHome from "./MarathonLivesHome"
import AllReddits from "../reddit/Reddits"
import RunsHome from "./RunsHome"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"
import { News, Runner } from "@/components/lib/Icons"
import GetArticleList from "../sdc/articles/GetArticleList"

const Home = () => {
  return (
    <ScrollView style={[mainStyle.container, { backgroundColor: "white" }]}>
      <Header backButton={false} />
      <View style={style.titleAndIcon}>
        <Text style={style.title}>Latest News</Text>
        <News />
      </View>
      <AllReddits limit={5} />
      <GetArticleList limit={5} />
      <View style={style.titleAndIcon}>
        <Text style={style.title}>Latest Runs</Text>
        <Runner />
      </View>
      <RunsHome limit={5} />
      <MarathonLivesHome limit={5} />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  title: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
  },
  titleAndIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Utils.moderateScale(10),
  },
})

export default Home
