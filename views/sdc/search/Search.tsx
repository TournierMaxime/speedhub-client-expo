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
import { useRouter } from "expo-router"

const Search = () => {
    const { data, setData, handleSearch, result } = useHandleSearch()

    const router = useRouter()

    const handleRedirectToUser = (id: string) => {
        router.push({
            pathname: "/(main)/(user)/user",
            params: {
                id
            }
        })
    }

    const renderItem = ({ item }: { item: any }) => {

        return (
            <TouchableOpacity style={style.card} onPress={() => handleRedirectToUser(item.id)}>
                <Text style={style.cardItem}>{item.names.international}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={style.container}>
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
        backgroundColor: "#fff",
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
