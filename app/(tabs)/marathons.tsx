import { View, StyleSheet, ScrollView } from "react-native"
import MarathonLives from "@/views/home/MarathonLives"
import UpcomingMarathons from "@/views/home/UpcomingMarathons"
import Header from "@/components/lib/Header"

export default function MarathonsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header backButton={false} />
      <MarathonLives />
      <UpcomingMarathons />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
  },
})
