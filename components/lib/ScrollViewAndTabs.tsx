import React from "react"
import useHandleTab from "@/hooks/utils/useHandleTab"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native"
import Utils from "./Utils"

export const TabName = ({
  tabs,
  activeTab,
  changeTab,
}: {
  tabs: any[]
  activeTab: number
  changeTab: (index: number) => void
}) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => changeTab(index)}
          style={[styles.tab, activeTab === index && styles.activeTab]}
        >
          <Text style={activeTab === index ? styles.activeText : styles.text}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const ScrollViewAndTabs = ({
  tabs,
  activeTab,
  changeTab,
  scrollViewRef,
}: {
  tabs: { name: string; component: React.JSX.Element }[]
  activeTab: number
  changeTab: (index: number) => void
  scrollViewRef: React.RefObject<ScrollView>
}) => {
  const { width } = useHandleTab()

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={(event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width)
        changeTab(newIndex)
      }}
      style={{ flex: 1 }}
    >
      {tabs.map((tab, index) => (
        <View key={index} style={{ width, flex: 1 }}>
          {tab.component}
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: Utils.moderateScale(5),
    justifyContent: "space-around",
    borderTopLeftRadius: Utils.moderateScale(25),
    borderTopRightRadius: Utils.moderateScale(25),
    marginTop: Utils.moderateScale(-22),
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "blue",
  },
  text: {
    color: "black",
    fontSize: 16,
  },
  activeText: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default ScrollViewAndTabs
