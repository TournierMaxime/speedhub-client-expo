import React from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import IsLoading from "@/components/lib/IsLoading"
import CatchError from "@/components/lib/CatchError"
import { useState, useEffect } from "react"
import { FlatList, ScrollView, View, Text, StyleSheet } from "react-native"
import { useColorScheme } from "react-native"
import { redditService } from "@/services/reddit"
import mainStyle from "@/styles/base/main"
import { Reddits } from "@/types/reddit"
import OneReddit from "./OneReddit"
import { News } from "@/components/lib/Icons"
import Utils from "@/components/lib/Utils"

interface Props {
  limit?: number
}

const AllReddits: React.FC<Props> = ({ limit }) => {
  const theme = useColorScheme() ?? "light"

  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ["getReddits", limit],
    queryFn: async () => {
      return await redditService.getAllNews(limit ? { limit } : null)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
    //staleTime: 1000 * 60 * 30,
  })

  const [reddits, setReddits] = useState<Reddits["data"]["children"]>([])

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return <OneReddit data={item.data} key={index} />
  }

  const allReddits = () => {
    if (reddits.length > 0) {
      return (
        <FlatList
          ListHeaderComponent={
            <View style={style.titleAndIcon}>
              <Text style={style.title}>Latest News</Text>
              <News />
            </View>
          }
          data={reddits ?? []}
          horizontal={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.data.id.toString()}
          nestedScrollEnabled={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true}
          windowSize={5}
        />
      )
    }

    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.data.children)
      setReddits(mergedData)
    }
  }, [data])

  if (error) {
    return <CatchError error={error} />
  }

  return (
    <ScrollView style={mainStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : allReddits()}
    </ScrollView>
  )
}

const style = StyleSheet.create({
  title: {
    fontSize: Utils.moderateScale(20),
    fontWeight: "bold",
  },
  titleAndIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Utils.moderateScale(10),
  },
})

export default AllReddits
