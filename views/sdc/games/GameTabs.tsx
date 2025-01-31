import React, { Fragment } from "react"
import { FlatList, Text, ImageBackground, View } from "react-native"
import { Game } from "../interface"
import RenderItem from "@/components/lib/RenderItem"
import Leaderboard from "./Leaderboard"
import { oneGameTabsStyle } from "@/styles/views/oneGame"

const CategoriesTab = ({ data }: { data: Game["data"] }) => {
  const filteredCategories = data?.categories?.data?.filter(
    (c) => c.type === "per-game"
  )

  return (
    <ImageBackground
      source={{ uri: data?.assets?.background?.uri ?? null }}
      style={oneGameTabsStyle.backgroungImg}
      resizeMode="cover"
      imageStyle={{ opacity: 0.2 }}
    >
      <FlatList
        style={oneGameTabsStyle.tabContent}
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
              style={oneGameTabsStyle.tags}
              renderProperty={() => (
                <Fragment>
                  <Text style={oneGameTabsStyle.categoryTitle}>
                    {item.name}
                  </Text>

                  {categoryVariables.length > 0 ? (
                    categoryVariables.map((variable) => {
                      const defaultValueId = variable.values.default
                      const variableLabel =
                        variable.values.values[defaultValueId]?.label ??
                        "Unknown"

                      return (
                        <View
                          key={variable.id}
                          style={oneGameTabsStyle.variableContainer}
                        >
                          <Text style={oneGameTabsStyle.variableTitle}>
                            {variable.name}:
                          </Text>
                          <Text style={oneGameTabsStyle.variableValue}>
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

export { CategoriesTab }
