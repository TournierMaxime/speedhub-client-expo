import AllRuns from "@/views/sdc/runs/Runs"
import { StyleSheet, View } from "react-native"
import Header from "@/components/lib/Header"

const Tab = () => {
  return (
    <View style={style.container}>
      <Header backButton={true} />
      <AllRuns />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
  },
})

export default Tab
