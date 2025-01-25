import AllReddits from "@/views/reddit/Reddits"
import { StyleSheet, ScrollView } from "react-native"
import Header from "@/components/lib/Header"

const Tab = () => {
  return (
    <ScrollView style={style.container}>
      <Header backButton={false} title="" />
      <AllReddits />
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
  },
})

export default Tab
