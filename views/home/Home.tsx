import { FlatList } from "react-native"
import Header from "@/components/lib/Header"
import MarathonLivesHome from "./MarathonLivesHome"
import mainStyle from "@/styles/base/main"
import UpcomingMarathonsHome from "./UpcomingMarathonsHome"
import { Fragment } from "react"
import useNotification from "@/hooks/utils/useNotification"

const Home = () => {
  useNotification()

  const sections = [{ type: "live" }, { type: "upcoming" }]

  const renderItem = ({ item }: { item: { type: string } }) => {
    switch (item.type) {
      case "live":
        return <MarathonLivesHome limit={5} />
      case "upcoming":
        return <UpcomingMarathonsHome limit={5} />
      default:
        return null
    }
  }

  return (
    <Fragment>
      <Header backButton={false} />
      <FlatList
        data={sections}
        keyExtractor={(item) => item.type}
        renderItem={renderItem}
        contentContainerStyle={[
          mainStyle.container,
          { backgroundColor: "white" },
        ]}
      />
    </Fragment>
  )
}

export default Home
