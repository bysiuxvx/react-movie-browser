"use client"

import React from "react"
import axios from "axios"

import { modalDetailsAtom, sidebarVisibleAtom } from "../../store/store"

import { Menu } from "semantic-ui-react"
import { useAtom } from "jotai"
import { Favorite } from "@prisma/client"

const FavoriteElement = (media: Favorite) => {
  const [, setModalDetails] = useAtom(modalDetailsAtom)
  const [, setSidebarVisible] = useAtom(sidebarVisibleAtom)

  const MIN_WINDOW_WIDTH: number = 1440

  const URL: string = `/api/search/id?movieId=${media.itemId}`

  const getMediaDetails = async () => {
    try {
      const { data } = await axios.get(URL)
      setModalDetails(data)
      if (window.innerWidth < MIN_WINDOW_WIDTH) setSidebarVisible(false)
    } catch (error: any) {
      console.error("Error fetching media details:", error)

      if (error.response) {
        console.log(
          `Error: ${
            error.response.data.error || "Failed to fetch movie details"
          }`
        )
      } else {
        console.log("An unexpected error occurred. Please try again later.")
      }
    }
  }

  return (
    <Menu.Item onClick={() => getMediaDetails()}>
      {media?.itemName} - {media?.itemYear}
    </Menu.Item>
  )
}

export default FavoriteElement
