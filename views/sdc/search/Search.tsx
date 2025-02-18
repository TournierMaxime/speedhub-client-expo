import React, { useState, useEffect } from "react"
import { View, Text, Image, ScrollView } from "react-native"
import useHandleSearch from "@/hooks/search/useHandleSearch"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useColorScheme } from "react-native"
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
import searchStyle from "@/styles/components/search"
import mainStyle from "@/styles/base/main"

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
            <View style={searchStyle.cardContent}>
              {item?.assets["cover-large"]?.uri ? (
                <Image
                  style={searchStyle.img}
                  source={{ uri: item.assets["cover-large"].uri }}
                />
              ) : null}
              <Text style={searchStyle.cardItem}>
                {item.names?.international}
              </Text>
            </View>
          </Card>
        )
      default:
        return (
          <Card key={idx} route={ROUTES.ONE_USER} routeParams={{ id: item.id }}>
            <View style={searchStyle.cardContent}>
              {item?.assets?.image?.uri ? (
                <Image
                  style={searchStyle.img}
                  source={{ uri: item.assets.image.uri }}
                />
              ) : (
                <Image style={searchStyle.img} source={imageDefault} />
              )}
              <UserName
                data={item}
                width={Utils.moderateScale(200)}
                height={Utils.moderateScale(45)}
                style={searchStyle.cardItem}
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
      <Header backButton={true} lastPath={{ pathname: ROUTES.HOME }} />
      <View
        style={[
          searchStyle.container,
          theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
        ]}
      >
        <View style={searchStyle.searchForm}>
          <FormInputText
            data={data}
            setData={setData}
            label={
              selectedOptionValue === "users" ? "Search users" : "Search games"
            }
            name="query"
            value={data.query ?? ""}
            secure={false}
            readOnly={false}
            type=""
          />

          <BottomModal icon={true} title="Filters">
            <CheckboxForm setSelectedOptionValue={setSelectedOptionValue} />
          </BottomModal>
        </View>

        <View style={searchStyle.submitButton}>
          {theme === "dark" ? (
            <FormButtonSubmit
              type="secondary"
              label="Search"
              fct={handleSearchWithFlag}
              disabled={!data.query}
            />
          ) : (
            <FormButtonSubmit
              type="primary"
              label="Search"
              fct={handleSearchWithFlag}
              disabled={!data.query}
            />
          )}
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

export default Search
