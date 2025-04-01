import React, { Fragment } from "react"
import MarathonLives from "@/views/marathon/MarathonLives"
import UpcomingMarathons from "@/views/marathon/UpcomingMarathons"
import { useQuery } from "@tanstack/react-query"
import { horaroService } from "@/services/speedhub"
import { GetMarathon, Marathons } from "@/types/speedhub"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"

const AllMarathons = () => {
  const { data, isLoading, error, refetch } = useQuery<Marathons["data"]>({
    queryKey: ["getMarathons"],
    queryFn: async () => {
      return await horaroService.getMarathons()
    },
  })

  if (error) {
    return <CatchError error={error} />
  }

  if (data === undefined && isLoading) {
    refetch()
  }

  const lives = data && data.filter((marathon) => marathon.type === "live")
  const upcomings =
    data && data.filter((marathon) => marathon.type === "upcoming")

  return (
    <Fragment>
      {isLoading ? (
        <IsLoading isLoading={isLoading} />
      ) : (
        <Fragment>
          {lives && <MarathonLives data={lives} />}
          {upcomings && <UpcomingMarathons data={upcomings} />}
        </Fragment>
      )}
    </Fragment>
  )
}

export default AllMarathons
