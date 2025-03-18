import { FlatList } from "react-native"
import Header from "@/components/lib/Header"
import MarathonLivesHome from "./MarathonLivesHome"
import RedditsHome from "./RedditsHome"
import mainStyle from "@/styles/base/main"

const Home = () => {
  const sections = [{ type: "header" }, { type: "news" }, { type: "marathons" }]

  const renderItem = ({ item }: { item: { type: string } }) => {
    switch (item.type) {
      case "header":
        return <Header backButton={false} />
      case "news":
        return <RedditsHome limit={5} />
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
