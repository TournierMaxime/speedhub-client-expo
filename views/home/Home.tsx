import { ScrollView } from "react-native"
import Header from "@/components/lib/Header"
import MarathonLives from "./MarathonLives"
import UpcomingMarathons from "./UpcomingMarathons"
import AllReddits from "../reddit/Reddits"
import AllRuns from "../sdc/runs/Runs"
import mainStyle from "@/styles/base/main"

const Home = () => {
  return (
    <ScrollView style={mainStyle.container}>
      <Header backButton={false} />
      <AllReddits limit={5} />
      <AllRuns limit={5} />
      <MarathonLives limit={5} />
      <UpcomingMarathons limit={5} />
    </ScrollView>
  )
}

export default Home
