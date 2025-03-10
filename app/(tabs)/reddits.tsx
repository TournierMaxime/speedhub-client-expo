import AllReddits from "@/views/reddit/Reddits"
import { StyleSheet, View } from "react-native"
import Header from "@/components/lib/Header"

const Tab = () => {
  return (
    <View style={style.container}>
      <Header backButton={true} />
      <AllReddits />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
  },
})

export default Tab
