import { Pathname } from "@/hooks/utils/useHandleRouter"

const navigationHistory: string[] = []

export const addToHistory = (path: Pathname, params?: any) => {
  navigationHistory.push(path, params)
}

export const getLastPath = () => {
  return navigationHistory.length > 1
    ? navigationHistory[navigationHistory.length - 2]
    : null
}

export const removeLastPath = () => {
  if (navigationHistory.length > 1) {
    return navigationHistory.pop()
  }
  return null
}
