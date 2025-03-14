import React, { Fragment } from "react"
import MarathonLives from "@/views/marathon/MarathonLives"
import UpcomingMarathons from "@/views/marathon/UpcomingMarathons"
import { useQuery } from "@tanstack/react-query"
import { horaroService } from "@/services/speedhub"
import { GetMarathon } from "@/types/speedhub"
import CatchError from "@/components/lib/CatchError"
import IsLoading from "@/components/lib/IsLoading"

const Marathons = () => {
  const { data, isLoading, error, refetch } = useQuery<GetMarathon>({
    queryKey: ["getMarathons"],
    queryFn: async () => {
      return await horaroService.getMarathons()
    },
  })

  if (error) {
    ;<CatchError error={error} />
  }

  if (data === undefined && isLoading) {
    refetch()
  }

  return (
    <Fragment>
      {isLoading ? (
        <IsLoading isLoading={isLoading} />
      ) : (
        <Fragment>
          {data && data.getLives && <MarathonLives data={data.getLives.data} />}
          {data && data.getUpcomings && (
            <UpcomingMarathons data={data.getUpcomings.data} />
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default Marathons
