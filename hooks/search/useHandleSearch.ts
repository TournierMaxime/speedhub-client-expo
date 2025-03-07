import { useState } from "react"
import { DataState } from "../auth/interface"
import { searchService } from "@/services/speedrunDotCom"
import { Search } from "@/types/sdc"

const useHandleSearch = () => {
  const [data, setData] = useState<DataState>({
    query: "",
  })

  const [result, setResult] = useState<Search | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      if (data.query) {
        const response = await searchService.GetSearch(data.query)

        setResult(response)

        setIsLoading(false)

        setData({
          query: "",
        })
      }
    } catch (error: any) {
      console.log(error)

      setIsLoading(false)

      setError(error)
    }
  }

  return {
    handleSearch,
    data,
    setData,
    result,
    setResult,
    error,
    isLoading,
  }
}

export default useHandleSearch
