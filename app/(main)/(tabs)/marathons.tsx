import { View, StyleSheet } from "react-native";
import MarathonLives from "@/views/home/MarathonLives";
import UpcomingMarathons from "@/views/home/UpcomingMarathons";
import Header from "@/components/lib/Header";

export default function MarathonsScreen() {
    return (
        <View style={styles.container}>
            <Header backButton={true} title="" />
            <MarathonLives />
            <UpcomingMarathons />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex"
    },
});