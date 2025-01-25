import Form from "@/components/lib/Form"
import React, { Fragment, useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from "react-native"
import useHandleSearch from "@/hooks/search/useHandleSearch"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import ROUTES from "@/components/routes"
import UserName from "@/components/lib/UserName"
import CheckboxForm from "./CheckBoxForm"
import { Chevron } from "@/components/lib/Icons"

const Search = () => {
  const [selectedOptionValue, setSelectedOptionValue] =
    useState<string>("users")

  const { data, setData, handleSearch, result, setResult } = useHandleSearch()

  const theme = useColorScheme() ?? "light"

  const { handleRedirect } = useHandleRouter()

  const imageDefault = require("../../../assets/images/default.png")

  const renderItem = ({ item }: { item: any }) => {
    switch (selectedOptionValue) {
      case "games":
        return (
          <TouchableOpacity
            style={[
              style.card,
              theme == "dark"
                ? { backgroundColor: Colors.dark.background }
                : { backgroundColor: Colors.light.background },
            ]}
            onPress={async () =>
              await handleRedirect(ROUTES.ONE_GAME, { id: item.id })
            }
          >
            <View style={style.cardLeft}>
              {item?.assets["cover-large"]?.uri ? (
                <Image
                  style={{
                    width: Utils.moderateScale(80),
                    height: Utils.moderateScale(80),
                    resizeMode: "contain",
                  }}
                  source={{ uri: item.assets["cover-large"].uri }}
                />
              ) : null}
              <Text
                style={[
                  style.cardItem,
                  {
                    fontSize: Utils.moderateScale(16),
                    fontWeight: "bold",
                    textAlign: "left",
                  },
                ]}
              >
                {item.names?.international}
              </Text>
            </View>
            <View>
              <Chevron />
            </View>
          </TouchableOpacity>
        )
      default:
        return (
          <TouchableOpacity
            style={[
              style.card,
              theme == "dark"
                ? { backgroundColor: Colors.dark.background }
                : { backgroundColor: Colors.light.background },
            ]}
            onPress={async () =>
              await handleRedirect(ROUTES.ONE_USER, { id: item.id })
            }
          >
            <View style={style.cardLeft}>
              {item?.assets?.image?.uri ? (
                <Image
                  style={{
                    width: Utils.moderateScale(80),
                    height: Utils.moderateScale(80),
                    resizeMode: "contain",
                  }}
                  source={{ uri: item.assets.image.uri }}
                />
              ) : (
                <Image
                  style={{
                    width: Utils.moderateScale(80),
                    height: Utils.moderateScale(80),
                    resizeMode: "contain",
                  }}
                  source={imageDefault}
                />
              )}
              <UserName
                data={item}
                width={Utils.moderateScale(200)}
                height={Utils.moderateScale(45)}
                style={style.cardItem}
              />
            </View>
            <View>
              <Chevron />
            </View>
          </TouchableOpacity>
        )
    }
  }

  useEffect(() => {
    setResult({ data: [] })
  }, [selectedOptionValue])

  return (
    <Fragment>
      <Header backButton={true} title="" />
      <View
        style={[
          style.container,
          theme === "dark"
            ? { backgroundColor: Colors.dark.cardBackground }
            : { backgroundColor: Colors.light.cardBackground },
        ]}
      >
        <View style={style.searchForm}>
          {Form.inputText(
            data,
            setData,
            "Search",
            "query",
            data.query ?? "",
            false,
            false
          )}
          <CheckboxForm setSelectedOptionValue={setSelectedOptionValue} />
          {Form.submit(
            "info",
            "Search",
            async () => await handleSearch(selectedOptionValue),
            !data.query
          )}
        </View>

        <FlatList
          data={result.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </Fragment>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    height: "80%",
    width: "95%",
    marginHorizontal: "auto",
    marginVertical: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    borderColor: "grey",
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginLeft: Utils.moderateScale(20),
    marginVertical: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
    padding: Utils.moderateScale(10),
    shadowOffset: {
      width: Utils.moderateScale(0),
      height: Utils.moderateScale(2),
    },
    shadowOpacity: Utils.moderateScale(0.25),
    shadowRadius: Utils.moderateScale(3.5),
    elevation: Utils.moderateScale(5),
  },
  cardItem: {
    display: "flex",
    alignItems: "center",
    padding: Utils.moderateScale(10),
  },
  cardLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})

export default Search
