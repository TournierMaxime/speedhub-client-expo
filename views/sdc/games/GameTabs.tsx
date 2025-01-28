import React from "react"
import { StyleSheet, FlatList, Text, View } from "react-native"
import { Game } from "../interface"
import RenderItem from "@/components/lib/RenderItem"
import Utils from "@/components/lib/Utils"

const CategoriesTab = ({
  categories,
}: {
  categories: Game["data"]["categories"]["data"]
}) => {
  const filteredItem = categories.filter((c) => c.type === "per-game")

  return (
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
  )
}

const LevelsTab = ({ levels }: { levels: Game["data"]["levels"]["data"] }) => (
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
)

const ModeratorsTab = ({
  moderators,
}: {
  moderators: Game["data"]["moderators"]["data"]
}) => (
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
)

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
})

export { CategoriesTab, ModeratorsTab, LevelsTab }
