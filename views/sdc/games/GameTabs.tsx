import React, { Fragment, useState, useEffect } from "react"
import { FlatList, Text, View } from "react-native"
import RenderItem from "@/components/lib/RenderItem"
import Leaderboard from "./Leaderboard"
import { oneGameTabsStyle } from "@/styles/views/oneGame"
import { Game, Values } from "@/types/sdc"
import Chip from "@/components/lib/Chip"

const CategoriesTab = ({ data }: { data: Game["data"] }) => {
  const filteredCategories = data?.categories?.data?.filter(
    (c) => c.type === "per-game"
  )

  const [selectedVariablesMap, setSelectedVariablesMap] = useState<
    Record<string, Record<string, string>>
  >({})

  console.log("selectedVariablesMap", selectedVariablesMap)

  useEffect(() => {
    const initialVariablesMap: Record<string, Record<string, string>> = {}

    filteredCategories.forEach((category) => {
      const categoryVariables = category.variables?.data ?? []
      const initialVariables: Record<string, string> = {}

      categoryVariables.forEach((variable) => {
        initialVariables[`var-${variable.id}`] = variable.values.default
      })

      initialVariablesMap[category.id] = initialVariables
    })

    setSelectedVariablesMap(initialVariablesMap)
  }, [])

  const handleSelectVariable = (
    categoryId: string,
    variableId: string,
    valueId: string
  ) => {
    setSelectedVariablesMap((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [`var-${variableId}`]: valueId,
      },
    }))
  }

  return (
    <FlatList
      style={oneGameTabsStyle.tabContent}
      data={filteredCategories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const categoryVariables = item.variables?.data ?? []
        const selectedVariables = selectedVariablesMap[item.id] || {}

        return (
          <RenderItem
            item={item}
            style={oneGameTabsStyle.tags}
            renderProperty={() => (
              <Fragment>
                <Text style={oneGameTabsStyle.categoryTitle}>{item.name}</Text>

                {categoryVariables.length > 0 ? (
                  categoryVariables.map((variable) => {
                    const values: Values = variable.values

                    return (
                      <View
                        key={variable.id}
                        style={oneGameTabsStyle.variableContainer}
                      >
                        <FlatList
                          data={Object.keys(values.values)}
                          keyExtractor={(key) => key}
                          horizontal
                          renderItem={({ item: valueId }) => {
                            const value = values.values[valueId]

                            const isSelected =
                              selectedVariables[`var-${variable.id}`] ===
                              valueId

                            return (
                              <Chip
                                title={value.label}
                                key={valueId}
                                isSelected={isSelected}
                                onPress={() =>
                                  handleSelectVariable(
                                    item.id,
                                    variable.id,
                                    valueId
                                  )
                                }
                              />
                            )
                          }}
                        />
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
  )
}

export { CategoriesTab }
