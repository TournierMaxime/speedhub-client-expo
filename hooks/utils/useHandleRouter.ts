import { ExternalPathString, RelativePathString, useRouter } from "expo-router"

export type Pathname = RelativePathString | ExternalPathString

const useHandleRouter = () => {
  const router = useRouter()

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

  const handleBack = async (pathname?: Pathname, params?: any) => {
    const canGoBack = router.canGoBack()

    if (canGoBack) {
      if (pathname) {
        router.push({
          pathname,
        })
      } else if (pathname && params) {
        router.push({
          pathname,
          params,
        })
      } else {
        router.back()
      }
    }
  }

  return {
    handleRedirect,
    handleReplace,
    handleBack,
  }
}

export default useHandleRouter
