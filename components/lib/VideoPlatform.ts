import { VideoPlatform } from "@/types/speedhub"

const PLATFORM = ["youtube", "youtu.be", "twitch"]

export const getPlatformFromUrl = (
  url: string | undefined
): VideoPlatform | undefined => {
  if (!url) return undefined

  return (
    (Object.values(PLATFORM).find((domain) =>
      url.includes(domain)
    ) as VideoPlatform) ?? undefined
  )
}
