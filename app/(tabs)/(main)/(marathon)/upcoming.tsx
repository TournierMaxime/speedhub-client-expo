import { StyleSheet, View } from "react-native"
import Header from "@/components/lib/Header"
import UpcomingMarathons from "@/views/marathon/UpcomingMarathons"

export default function UpcomingMarathonScreen() {
  return (
    <View style={styles.container}>
      <Header backButton={true} />
      <UpcomingMarathons />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
  },
})
