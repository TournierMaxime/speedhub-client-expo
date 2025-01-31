import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, Image, ScrollView } from "react-native"
import useHandleSearch from "@/hooks/search/useHandleSearch"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import ROUTES from "@/components/routes"
import UserName from "@/components/lib/UserName"
import CheckboxForm from "./CheckBoxForm"
import BottomModal from "@/components/lib/Modal"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import Card from "@/components/lib/Card"
import {
  FormButtonSubmit,
  FormInputText,
} from "@/components/lib/FormValidation"

const Search = () => {
  const [selectedOptionValue, setSelectedOptionValue] =
    useState<string>("users")

  const { data, setData, handleSearch, result, setResult, isLoading, error } =
    useHandleSearch()

  const [hasSearched, setHasSearched] = useState<boolean>(false)

  const theme = useColorScheme() ?? "light"

  const imageDefault = require("../../../assets/images/default.png")

  const handleSearchWithFlag = async () => {
    await handleSearch(selectedOptionValue)
    setHasSearched(true)
  }

  const renderItem = (item: any, idx: number) => {
    switch (selectedOptionValue) {
      case "games":
        return (
          <Card key={idx} route={ROUTES.ONE_GAME} routeParams={{ id: item.id }}>
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
          </Card>
        )
      default:
        return (
          <Card key={idx} route={ROUTES.ONE_USER} routeParams={{ id: item.id }}>
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
          </Card>
        )
    }
  }

  if (error) {
    return <CatchError error={error} />
  }

  useEffect(() => {
    setResult({ data: [] })
  }, [selectedOptionValue])

  return (
    <ScrollView>
      <Header backButton={true} title="" />
      <View
        style={[
          style.container,
          theme === "dark"
            ? { backgroundColor: Colors.dark.background }
            : { backgroundColor: Colors.light.background },
        ]}
      >
        <View style={style.searchForm}>
          <FormInputText
            data={data}
            setData={setData}
            label="Search"
            name="query"
            value={data.query ?? ""}
            secure={false}
            readOnly={false}
            type=""
            css={{ width: "95%", display: "flex" }}
          />

          <BottomModal icon={true} title="Filters">
            <CheckboxForm setSelectedOptionValue={setSelectedOptionValue} />
          </BottomModal>
        </View>
        <View style={style.submitButton}>
          <FormButtonSubmit
            type="info"
            label="Search"
            fct={handleSearchWithFlag}
            disabled={!data.query}
          />
        </View>

        {isLoading ? (
          <IsLoading isLoading={isLoading} />
        ) : !hasSearched ? null : result.data.length === 0 ? (
          <Text>No result</Text>
        ) : (
          result.data.map((item: any, idx: number) => renderItem(item, idx))
        )}
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    display: "flex",
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
    paddingBottom: Utils.moderateScale(10),
  },
  searchForm: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  submitButton: {
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
    marginVertical: Utils.moderateScale(10),
  },
  cardLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
})

export default Search
