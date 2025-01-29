import React from "react"
import { StyleSheet, FlatList, Text, ImageBackground } from "react-native"
import { Game } from "../interface"
import RenderItem from "@/components/lib/RenderItem"
import Utils from "@/components/lib/Utils"

const CategoriesTab = ({ data }: { data: Game["data"] }) => {
  const filteredItem = data.categories.data.filter((c) => c.type === "per-game")

  return (
    <ImageBackground
      source={{
        uri: data?.assets?.background?.uri ?? null,
      }}
      style={style.backgroungImg}
      resizeMode="cover"
      imageStyle={{ opacity: 0.2 }}
    >
      <FlatList
        style={style.tabContent}
        data={filteredItem}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => {
          return (
            <RenderItem
              item={item}
              style={style.tags}
              renderProperty={(item) => {
                if (item.type === "per-game") {
                  return <Text>{item.name}</Text>
                }
              }}
            />
          )
        }}
      />
    </ImageBackground>
  )
}

const LevelsTab = ({ data }: { data: Game["data"] }) => {
  const levels = data?.levels?.data

  return (
    <ImageBackground
      source={{
        uri: data?.assets?.background?.uri ?? null,
      }}
      style={style.backgroungImg}
      resizeMode="cover"
      imageStyle={{ opacity: 0.2 }}
    >
      <FlatList
        style={style.tabContent}
        data={levels}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            style={style.tags}
            renderProperty={(item) => <Text>{item.name}</Text>}
          />
        )}
      />
    </ImageBackground>
  )
}

const ModeratorsTab = ({ data }: { data: Game["data"] }) => {
  const moderators = data?.moderators?.data

  return (
    <ImageBackground
      source={{
        uri: data?.assets?.background?.uri ?? null,
      }}
      style={style.backgroungImg}
      resizeMode="cover"
      imageStyle={{ opacity: 0.2 }}
    >
      <FlatList
        style={style.tabContent}
        data={moderators}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            style={style.tags}
            renderProperty={(item) => <Text>{item.names.international}</Text>}
          />
        )}
      />
    </ImageBackground>
  )
}

const style = StyleSheet.create({
  text: {
    fontSize: Utils.moderateScale(16),
  },
  tabContent: {
    flex: 1,
    padding: Utils.moderateScale(10),
    marginVertical: Utils.moderateScale(10),
  },
  tags: {
    backgroundColor: "#E0E0E0",
    padding: Utils.moderateScale(5),
    margin: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
    fontSize: Utils.moderateScale(16),
  },
  backgroungImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
})

export { CategoriesTab, ModeratorsTab, LevelsTab }
