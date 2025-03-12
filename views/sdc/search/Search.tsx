import React, { Fragment, useState } from "react"
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import useHandleSearch from "@/hooks/search/useHandleSearch"
import Utils from "@/components/lib/Utils"
import { useColorScheme } from "react-native"
import ROUTES from "@/components/routes"
import UserName from "@/components/lib/UserName"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"
import Card from "@/components/lib/Card"
import { FormInputText } from "@/components/lib/FormValidation"
import searchStyle from "@/styles/components/search"
import mainStyle from "@/styles/base/main"
import { Search as SearchSDC } from "@/types/sdc"
import { LeftArrow } from "@/components/lib/Icons"
import useHandleRouter from "@/hooks/utils/useHandleRouter"

const Search = () => {
  const { data, setData, handleSearch, result, setResult, isLoading, error } =
    useHandleSearch()

  const { handleRedirect } = useHandleRouter()

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
            const { staticAssets, name, url } = user
            return (
              <Card
                key={`user-${idx}`}
                route={ROUTES.ONE_USER}
                routeParams={{ url }}
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
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={[
          searchStyle.container,
          theme === "dark" ? mainStyle.themeDark : mainStyle.themeLight,
        ]}
      >
        <View style={searchStyle.searchForm}>
          <TouchableOpacity
            style={{ marginRight: Utils.moderateScale(20) }}
            onPress={() => handleRedirect(ROUTES.HOME)}
          >
            <LeftArrow />
          </TouchableOpacity>

          <FormInputText
            data={data}
            setData={setData}
            label={"Search users, games..."}
            name="query"
            value={data.query ?? ""}
            secure={false}
            readOnly={false}
            onSubmitEditing={handleSearchWithFlag}
          />
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
