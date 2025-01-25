import { StyleSheet, ScrollView } from "react-native"
import Header from "@/components/lib/Header"
import MarathonLives from "./MarathonLives"
import UpcomingMarathons from "./UpcomingMarathons"
import AllReddits from "../reddit/Reddits"
import AllRuns from "../sdc/runs/Runs"

const Home = () => {
  return (
    <ScrollView style={style.container}>
      <Header backButton={false} />
      <AllReddits limit={5} />
      <AllRuns limit={5} />
      <MarathonLives limit={5} />
      <UpcomingMarathons limit={5} />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
  },
})

export default Home
