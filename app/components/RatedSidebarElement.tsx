"use client"

import React from "react"
import {modalDetailsAtom, sidebarVisibleAtom} from "../../store/store"
import {Menu} from "semantic-ui-react"
import {useAtom} from "jotai"
import {Rating} from "@prisma/client"

const RatedElement = (ratedItem: Rating) => {
  const [modalDetails, setModalDetails] = useAtom(modalDetailsAtom)
  const [, setSidebarVisible] = useAtom(sidebarVisibleAtom)

  const MIN_WINDOW_WIDTH: number = 1440
  const URL: string = `/api/search/id?movieId=${ratedItem.itemId}`

  const getMediaDetails = async () => {
    if (modalDetails?.imdbID === ratedItem.itemId) return
    try {
      const response = await fetch(URL)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setModalDetails(data)
      if (window.innerWidth < MIN_WINDOW_WIDTH) setSidebarVisible(false)
    } catch (error: any) {
      console.error("Error fetching media details:", error)

      if (error instanceof Error) {
        console.log(
          `Error: ${error.message || "Failed to fetch movie details"}`
        )
      } else {
        console.log("An unexpected error occurred. Please try again later.")
      }
    }
  }

  return (
    <Menu.Item onClick={() => getMediaDetails()}>
      {ratedItem?.title} - {ratedItem?.itemYear}
    </Menu.Item>
  )
}

export default RatedElement
