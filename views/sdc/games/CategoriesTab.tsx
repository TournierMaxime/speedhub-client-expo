import React from "react"
import { FlatList, Text, View } from "react-native"
import {
  GetGameData,
  GetGameDataCategory,
  GetGameDataValue,
  GetGameDataVariable,
} from "@/types/sdc"
import Chip from "@/components/lib/Chip"
import Utils from "@/components/lib/Utils"
import { redirectAlertMessage } from "@/components/lib/AlertMessage"
import cardItemStyle from "@/styles/components/cardItem"

const Values = ({
  values,
  variableId,
  url,
  categoryId,
}: {
  values: GetGameDataValue[]
  variableId: string
  url: string
  categoryId: string
}) => {
  return values.map((value, idx) => {
    if (value.variableId === variableId) {
      return (
        <Chip
          key={idx}
          title={value.name}
          onPress={async () => {
            const fullUrl = `https://www.speedrun.com/${url}?x=${categoryId}-${variableId}.${value.id}`
            await redirectAlertMessage(fullUrl)
          }}
        />
      )
    }
  })
}

const Variables = ({
  variables,
  categoryId,
  values,
  url,
}: {
  variables: GetGameDataVariable[]
  categoryId: string
  values: GetGameDataValue[]
  url: string
}) => {
  if (variables) {
    return variables.map((variable, idx) => {
      if (categoryId === variable.categoryId) {
        return (
          <View key={idx} style={{ display: "flex", flexDirection: "column" }}>
            <Text
              style={{ fontSize: Utils.moderateScale(14), fontWeight: "bold" }}
            >
              {variable.name}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Values
                values={values}
                variableId={variable.id}
                url={url}
                categoryId={categoryId}
              />
            </View>
          </View>
        )
      }
    })
  }
  return null
}

const CategoriesTab = ({ data }: { data: GetGameData }) => {
  if (!data) return

  const url = data.game.url

  const renderItem = ({
    item,
    index,
  }: {
    item: GetGameDataCategory
    index: number
  }) => {
    if (!item.isMisc && !item.isPerLevel && !item.archived) {
      return (
        <View key={index} style={cardItemStyle.cardItem}>
          <Text style={cardItemStyle.title}>{item.name}</Text>

          <Variables
            variables={data.variables}
            categoryId={item.id}
            values={data.values}
            url={url}
          />
        </View>
      )
    }
    return null
  }

  return (
    <FlatList
      data={data.categories}
      nestedScrollEnabled={true}
      renderItem={renderItem}
    />
  )
}

export { CategoriesTab }
