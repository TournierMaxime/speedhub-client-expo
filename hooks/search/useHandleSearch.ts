import { useState } from "react"
import { DataState } from "../auth/interface"
import { userService } from "@/services/speedrunDotCom"
import { gameService } from "@/services/speedrunDotCom"

const useHandleSearch = () => {
  const [data, setData] = useState<DataState>({
    query: "",
  })

  const [result, setResult] = useState({ data: [] })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  const handleSearch = async (name: string) => {
    try {
      setResult({ data: [] })
      let response
      setIsLoading(true)

      if (name === "users") {
        response = await userService.getUsers({
          name: data.query ?? "",
        })

        setIsLoading(false)
      } else if (name === "games") {
        response = await gameService.getGames({
          name: data.query ?? "",
        })

        setIsLoading(false)
      }

      setIsLoading(false)

      setResult(response)

      setData({
        query: "",
      })
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
