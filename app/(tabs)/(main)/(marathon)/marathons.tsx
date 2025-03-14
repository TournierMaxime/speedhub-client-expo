import { StyleSheet, ScrollView } from "react-native"
import Header from "@/components/lib/Header"
import Marathons from "@/views/marathon/Marathons"

export default function MarathonsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header backButton={true} />
      <Marathons />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
  },
})
