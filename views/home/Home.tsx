import { FlatList, Text, StyleSheet, View } from "react-native"
import Header from "@/components/lib/Header"
import MarathonLivesHome from "./MarathonLivesHome"
import AllReddits from "../reddit/Reddits"
import RunsHome from "./RunsHome"
import mainStyle from "@/styles/base/main"
import Utils from "@/components/lib/Utils"
import { News, Runner } from "@/components/lib/Icons"
import GetArticleList from "../sdc/articles/GetArticleList"

const Home = () => {
  const sections = [
    { type: "header" },
    { type: "news" },
    { type: "articles" },
    { type: "runs" },
    { type: "marathons" },
  ]

  const renderItem = ({ item }: { item: { type: string } }) => {
    switch (item.type) {
      case "header":
        return <Header backButton={false} />
      case "news":
        return <AllReddits limit={5} />
      case "articles":
        return <GetArticleList limit={5} />
      case "runs":
        return <RunsHome limit={20} />
      case "marathons":
        return <MarathonLivesHome limit={5} />
      default:
        return null
    }
  }

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.type}
      renderItem={renderItem}
      contentContainerStyle={[
        mainStyle.container,
        { backgroundColor: "white" },
      ]}
    />
  )
}

export default Home
