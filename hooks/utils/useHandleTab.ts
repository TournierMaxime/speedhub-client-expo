import { useRef, useState } from "react"
import { ScrollView, Dimensions } from "react-native"

const useHandleTab = () => {
  const scrollViewRef = useRef<ScrollView>(null)
  const [activeTab, setActiveTab] = useState(0)
  const { width } = Dimensions.get("window")

  const changeTab = (index: number) => {
    setActiveTab(index)

    scrollViewRef.current?.scrollTo({ x: index * width, animated: true })
  }

  return {
    activeTab,
    changeTab,
    width,
    scrollViewRef,
  }
}

export default useHandleTab
