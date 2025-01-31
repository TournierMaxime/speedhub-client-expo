import React from "react"
import { View, TouchableOpacity, Image } from "react-native"
import Utils from "./Utils"
import { useAuth } from "@/contexts/AuthContext"
import useHandleRouter from "@/hooks/utils/useHandleRouter"
import { useColorScheme } from "react-native"
import { Colors } from "@/constants/Colors"
import ROUTES from "../routes"
import { LeftArrow, Search, User } from "./Icons"
import headerStyle from "@/styles/base/header"

interface HeaderProps {
  backButton: boolean
  title?: string
}

const Header: React.FC<HeaderProps> = ({ backButton, title }) => {
  const { user, isAuthenticated } = useAuth()

  const theme = useColorScheme() ?? "light"

  const logo = require("../../assets/images/speedhub.webp")

  const { handleRedirect, handleBack } = useHandleRouter()

  const NotAuthenticatedUser = () => {
    if (isAuthenticated === false) {
      return (
        <View
          style={[
            headerStyle.header,
            theme === "dark" ? headerStyle.themeDark : headerStyle.themeLight,
          ]}
        >
          {backButton ? (
            <View style={headerStyle.backButton}>
              <TouchableOpacity onPress={async () => await handleBack()}>
                <LeftArrow />
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}

          <Image style={headerStyle.speedHubLogo} source={logo} />

          <View />
        </View>
      )
    }
  }

  const AuthenticatedUser = () => {
    if (isAuthenticated === true) {
      return (
        <View
          style={[
            headerStyle.header,
            theme === "dark" ? headerStyle.themeDark : headerStyle.themeLight,
          ]}
        >
          {backButton ? (
            <View style={headerStyle.backButton}>
              <TouchableOpacity onPress={async () => await handleBack()}>
                <LeftArrow />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                onPress={async () =>
                  handleRedirect(ROUTES.ONE_USER_PROFILE, {
                    userId: user?.userId,
                  })
                }
              >
                {user?.image ? (
                  <Image
                    source={{ uri: user.image }}
                    style={headerStyle.userImg}
                  />
                ) : (
                  <User />
                )}
              </TouchableOpacity>
            </View>
          )}

          <View>
            <Image style={headerStyle.speedHubLogo} source={logo} />
          </View>

          <View>
            <TouchableOpacity
              onPress={async () => handleRedirect(ROUTES.SEARCH)}
            >
              <Search />
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  return isAuthenticated === true ? AuthenticatedUser() : NotAuthenticatedUser()
}

export default Header
