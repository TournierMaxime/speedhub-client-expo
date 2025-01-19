import { StyleSheet, ScrollView, Text } from "react-native"
import Header from "@/components/lib/Header"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"

const Home = () => {
    const theme = useColorScheme() ?? "light"

    return (
        <ScrollView
            style={[
                style.container,
                theme === "dark"
                    ? { backgroundColor: Colors.dark.background }
                    : { backgroundColor: Colors.light.background },
            ]}
        >
            <Header backButton={false} title="" />
            <Text>Home</Text>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
    },
})

export default Home
