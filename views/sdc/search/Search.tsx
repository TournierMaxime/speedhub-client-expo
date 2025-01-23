import Form from "@/components/lib/Form"
import React from "react"
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native"
import useHandleSearch from "@/hooks/search/useHandleSearch"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import ROUTES from "@/components/routes"
import UserName from "@/components/lib/UserName"

const Search = () => {
    const { data, setData, handleSearch, result } = useHandleSearch()

    const theme = useColorScheme() ?? 'light';

    const { handleRedirect } = useHandleRouter()

    const renderItem = ({ item }: { item: any }) => {

        return (
            <TouchableOpacity style={style.card} onPress={async () => await handleRedirect(ROUTES.ONE_USER, { id: item.id })}>
                <UserName data={item} width={"auto"} height={Utils.moderateScale(45)} style={style.cardItem} />
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
        borderTopWidth: Utils.moderateScale(1),
    },
    cardItem: {
        display: "flex",
        alignItems: "center",
        paddingVertical: Utils.moderateScale(10)
    }
})

export default Search
