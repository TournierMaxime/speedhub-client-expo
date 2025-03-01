import { StyleSheet, ScrollView } from "react-native"
import MarathonLives from "@/views/marathon/MarathonLives"
import UpcomingMarathons from "@/views/marathon/UpcomingMarathons"
import Header from "@/components/lib/Header"

export default function MarathonsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header backButton={true} />
      <MarathonLives limit={10} />
      <UpcomingMarathons limit={10} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
  },
})
