import { View, Text, StyleSheet } from "react-native";

export default function MarathonsScreen() {
    return (
        <View style={styles.container}>
            <Text>Liste des Marathons</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});