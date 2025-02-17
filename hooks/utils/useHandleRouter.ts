import { ExternalPathString, RelativePathString, useRouter } from "expo-router"
import {
  addToHistory,
  removeLastPath,
  getLastPath,
} from "@/components/lib/navigationHistory"

export type Pathname = RelativePathString | ExternalPathString

const useHandleRouter = () => {
  const router = useRouter()

  const currentPath = (pathname: Pathname, params?: any) => {
    addToHistory(pathname, params)
    return getLastPath
  }

  const handleRedirect = async (pathname: Pathname, params?: any) => {
    router.push({
      pathname: pathname as Pathname,
      params: {
        ...params,
      },
    })
  }

  const handleReplace = async (pathname: Pathname, params?: any) => {
    router.replace({
      pathname: pathname as Pathname,
      params: {
        ...params,
      },
    })
  }

  const handleBack = async () => {
    const canGoBack = router.canGoBack()
    const path = getLastPath() as Pathname
    console.log("handleRedirect getLastPath", path)
    if (canGoBack) {
      router.push(path)
    }
  }

  return {
    handleRedirect,
    handleReplace,
    handleBack,
    currentPath,
  }
}

export default useHandleRouter
