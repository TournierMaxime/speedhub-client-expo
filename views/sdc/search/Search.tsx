import React, { Fragment, useState } from "react"
import { View, Text, Image, ScrollView } from "react-native"
import useHandleSearch from "@/hooks/search/useHandleSearch"
import Utils from "@/components/lib/Utils"
import Header from "@/components/lib/Header"
import { useColorScheme } from "react-native"
import ROUTES from "@/components/routes"
import UserName from "@/components/lib/UserName"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import Card from "@/components/lib/Card"
import {
  FormButtonSubmit,
  FormInputText,
} from "@/components/lib/FormValidation"
import searchStyle from "@/styles/components/search"
import mainStyle from "@/styles/base/main"
import { Search as SearchSDC } from "@/types/sdc"

const Search = () => {
  const { data, setData, handleSearch, result, setResult, isLoading, error } =
    useHandleSearch()

  const [hasSearched, setHasSearched] = useState<boolean>(false)

  const theme = useColorScheme() ?? "light"

  const imageDefault = require("../../../assets/images/default.png")

  const handleSearchWithFlag = async () => {
    await handleSearch()
    setHasSearched(true)
  }

  const renderItem = (data: SearchSDC) => {
    const { gameList, userList } = data

    const pathUrlPrefix = "https://www.speedrun.com"

    return (
      <Fragment>
        {gameList &&
          gameList.map((game, idx) => {
            const { id, staticAssets, name } = game
            return (
              <Card
                key={`game-${idx}`}
                route={ROUTES.ONE_GAME}
                routeParams={{ id }}
              >
                <View style={searchStyle.cardContent}>
                  {staticAssets[0]?.path ? (
                    <Image
                      style={searchStyle.img}
                      source={{
                        uri: `${pathUrlPrefix}${staticAssets[0]?.path}`,
                      }}
                    />
                  ) : (
                    <Image style={searchStyle.img} source={imageDefault} />
                  )}
                  <Text style={searchStyle.cardItem}>{name}</Text>
                </View>
              </Card>
            )
          })}

        {userList &&
          userList.map((user, idx) => {
            const { staticAssets, name, id } = user
            return (
              <Card
                key={`user-${idx}`}
                route={ROUTES.ONE_USER}
                routeParams={{ id }}
              >
                <View style={searchStyle.cardContent}>
                  {staticAssets[1]?.assetType === "image" ? (
                    <Image
                      style={searchStyle.img}
                      source={{
                        uri: `${pathUrlPrefix}${staticAssets[1]?.path}`,
                      }}
                    />
                  ) : (
                    <Image style={searchStyle.img} source={imageDefault} />
                  )}
                  <UserName
                    data={name}
                    width={Utils.moderateScale(200)}
                    height={Utils.moderateScale(45)}
                    style={searchStyle.cardItem}
                  />
                </View>
              </Card>
            )
          })}
      </Fragment>
    )
  }

  if (error) {
    return <CatchError error={error} />
  }

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
            label={"Search users, games..."}
            name="query"
            value={data.query ?? ""}
            secure={false}
            readOnly={false}
            type=""
          />
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
        ) : !hasSearched ? null : result &&
          result.gameList.length === 0 &&
          result.userList.length === 0 ? (
          <Text>No result</Text>
        ) : (
          result && renderItem(result)
        )}
      </View>
    </ScrollView>
  )
}

export default Search
