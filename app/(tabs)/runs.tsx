import AllRuns from "@/views/sdc/runs/Runs"
import { StyleSheet, ScrollView } from "react-native"
import Header from "@/components/lib/Header"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

const Tab = () => {
  const theme = useColorScheme() ?? "light"

  return (
    <ScrollView style={style.container}>
      <Header backButton={false} title="" />
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
