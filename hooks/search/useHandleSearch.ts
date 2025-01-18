import { useState } from "react"
import { DataState } from "../auth/interface"
import { userService } from "@/services/speedrunDotCom"

const useHandleSearch = () => {
  const [data, setData] = useState<DataState>({
    username: "",
  })

  const [result, setResult] = useState({ data: [] })

  const handleSearch = async () => {
    try {
      const response = await userService.getUsers({ name: data.username ?? "" })
      setData({
        username: "",
      })
      setResult(response)
    } catch (error: any) {
      console.log(error)
    }
  }
  return {
    handleSearch,
    data,
    setData,
    result,
  }
}

export default useHandleSearch
