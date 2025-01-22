import Form from "@/components/lib/Form"
import React from "react"
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Text,
} from "react-native"
import useHandleSearch from "@/hooks/search/useHandleSearch"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import ROUTES from "@/components/routes"

const Search = () => {
    const { data, setData, handleSearch, result } = useHandleSearch()

    const theme = useColorScheme() ?? 'light';

    const { handleRedirect } = useHandleRouter()

    const renderItem = ({ item }: { item: any }) => {

        return (
            <TouchableOpacity style={style.card} onPress={async () => await handleRedirect(ROUTES.ONE_USER, { id: item.id })}>
                <Text style={[style.cardItem, theme === "dark" ? { color: Colors.dark.text, borderColor: Colors.dark.borderColor } : { color: Colors.light.text, borderColor: Colors.light.borderColor }]}>{item.names.international}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[style.container, theme === "dark" ? { backgroundColor: Colors.dark.background } : { backgroundColor: Colors.light.background }]}>
            <Header backButton={true} title="" />
            <View style={style.searchForm}>
                {Form.inputText(
                    data,
                    setData,
                    "Search",
                    "username",
                    data.username ?? "",
                    false,
                    false
                )}
                {Form.submit(
                    "info",
                    "Search",
                    async () => await handleSearch(),
                    !data.username
                )}
            </View>

            <FlatList
                data={result.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%"
    },
    searchForm: {
        display: "flex",
        alignItems: "center"
    },
    card: {
        display: "flex",
        width: "90%",
        marginLeft: Utils.moderateScale(20),
    },
    cardItem: {
        fontSize: Utils.moderateScale(18),
        borderTopWidth: Utils.moderateScale(1),
        display: "flex",
        alignItems: "center",
        paddingVertical: Utils.moderateScale(10)

    }
})

export default Search
