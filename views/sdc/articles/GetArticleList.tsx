import React, { useState, useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { articleService } from "@/services/speedrunDotCom"
import CatchError from "@/components/lib/CatchError"
import GetArticle from "./GetArticle"
import { Articles } from "@/types/sdc"
import mainStyle from "@/styles/base/main"
import { ScrollView } from "react-native"
import IsLoading from "@/components/lib/IsLoading"

const GetArticleList = ({ limit }: { limit?: number }) => {
  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ["getArticleList", limit],
    queryFn: async () => {
      return await articleService.getArticleList(limit ?? undefined)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined
    },
    staleTime: 1000 * 60 * 30,
  })

  const [articles, setArticles] = useState<Articles["articleList"]>([])

  const allArticles = () => {
    if (articles.length > 0) {
      return articles.map((article, idx) => {
        return <GetArticle data={article} key={idx} />
      })
    }

    return null
  }

  useEffect(() => {
    if (data?.pages) {
      const mergedData = data.pages.flatMap((page) => page.articleList)
      setArticles(mergedData)
    }
  }, [data])

  if (error) {
    return <CatchError error={error} />
  }
  return (
    <ScrollView style={mainStyle.container}>
      {isLoading ? <IsLoading isLoading={isLoading} /> : allArticles()}
    </ScrollView>
  )
}

export default GetArticleList
