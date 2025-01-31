import React, { Fragment } from "react"
import { StyleSheet, FlatList, Text, ImageBackground, View } from "react-native"
import { Game } from "../interface"
import RenderItem from "@/components/lib/RenderItem"
import Utils from "@/components/lib/Utils"
import Leaderboard from "./Leaderboard"

const CategoriesTab = ({ data }: { data: Game["data"] }) => {
  const filteredCategories = data?.categories?.data?.filter(
    (c) => c.type === "per-game"
  )

  return (
    <ImageBackground
      source={{ uri: data?.assets?.background?.uri ?? null }}
      style={style.backgroungImg}
      resizeMode="cover"
      imageStyle={{ opacity: 0.2 }}
    >
      <FlatList
        style={style.tabContent}
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const categoryVariables = item.variables?.data ?? []

          const selectedVariables: Record<string, string> = {}

          categoryVariables.forEach((variable) => {
            const defaultValueId = variable.values.default
            selectedVariables[`var-${variable.id}`] = defaultValueId
          })

          return (
            <RenderItem
              item={item}
              style={style.tags}
              renderProperty={() => (
                <Fragment>
                  <Text style={style.categoryTitle}>{item.name}</Text>

                  {categoryVariables.length > 0 ? (
                    categoryVariables.map((variable) => {
                      const defaultValueId = variable.values.default
                      const variableLabel =
                        variable.values.values[defaultValueId]?.label ??
                        "Unknown"

                      return (
                        <View key={variable.id} style={style.variableContainer}>
                          <Text style={style.variableTitle}>
                            {variable.name}:
                          </Text>
                          <Text style={style.variableValue}>
                            {variableLabel}
                          </Text>
                        </View>
                      )
                    })
                  ) : (
                    <Text>No variables</Text>
                  )}

                  <Leaderboard
                    gameId={data.id}
                    categoryId={item.id}
                    variables={selectedVariables}
                    assets={data.assets}
                  />
                </Fragment>
              )}
            />
          )
        }}
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
  leaderboardContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: Utils.moderateScale(10),
    borderRadius: Utils.moderateScale(5),
    marginVertical: Utils.moderateScale(10),
  },
  categoryTitle: {
    fontSize: Utils.moderateScale(18),
    fontWeight: "bold",
    marginBottom: Utils.moderateScale(10),
  },
  variableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Utils.moderateScale(5),
  },
  variableTitle: {
    fontSize: Utils.moderateScale(14),
    fontWeight: "bold",
  },
  variableValue: {
    fontSize: Utils.moderateScale(14),
    fontStyle: "italic",
  },
  runContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E0E0E0",
    padding: Utils.moderateScale(5),
    marginVertical: Utils.moderateScale(5),
    borderRadius: Utils.moderateScale(5),
  },
  runPlace: {
    fontSize: Utils.moderateScale(16),
    fontWeight: "bold",
  },
  runTime: {
    fontSize: Utils.moderateScale(16),
  },
})

export { CategoriesTab }
