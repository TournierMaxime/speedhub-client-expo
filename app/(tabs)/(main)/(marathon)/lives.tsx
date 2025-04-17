import { StyleSheet, View } from "react-native"
import Header from "@/components/lib/Header"
import MarathonLives from "@/views/marathon/MarathonLives"

export default function LiveMarathonScreen() {
  return (
    <View style={styles.container}>
      <Header backButton={true} />
      <MarathonLives />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
  },
})
