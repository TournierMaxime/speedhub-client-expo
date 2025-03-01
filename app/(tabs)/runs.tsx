import AllRuns from "@/views/sdc/runs/Runs"
import { StyleSheet, ScrollView } from "react-native"
import Header from "@/components/lib/Header"

const Tab = () => {
  return (
    <ScrollView style={style.container}>
      <Header backButton={true} />
      <AllRuns />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
  },
})

export default Tab
