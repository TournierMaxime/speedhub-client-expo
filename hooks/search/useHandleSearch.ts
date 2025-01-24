import { useState } from "react"
import { DataState } from "../auth/interface"
import { userService } from "@/services/speedrunDotCom"
import { gameService } from "@/services/speedrunDotCom"

const useHandleSearch = () => {
  const [data, setData] = useState<DataState>({
    query: "",
  })

  const [result, setResult] = useState({ data: [] })

  const handleSearch = async (name: string) => {
    try {
      setResult({ data: [] })
      let response

      if (name === "users") {
        response = await userService.getUsers({
          name: data.query ?? "",
        })
      } else if (name === "games") {
        response = await gameService.getGames({
          name: data.query ?? "",
        })
      }
      setResult(response)
      setData({
        query: "",
      })
    } catch (error: any) {
      console.log(error)
    }
  }

  return {
    handleSearch,
    data,
    setData,
    result,
    setResult,
  }
}

export default useHandleSearch
