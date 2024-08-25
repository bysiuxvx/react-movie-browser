"use client"

import React, { useEffect } from "react"

import FavoriteElement from "./FavoriteElement"

import { Sidebar, Menu } from "semantic-ui-react"
import { sidebarVisibleAtom } from "../../store/store"
import { useAtom } from "jotai"
import { Favorite } from "@prisma/client"
import { useFavorites } from "../utils/favorites-actions"
const FavoritesSidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useAtom(sidebarVisibleAtom)

  const { favorites, isLoading, isError } = useFavorites()

  useEffect(() => {
    if (!favorites) setSidebarVisible(false)
  }, [favorites])

  return (
    <>
      <Sidebar
        as={Menu}
        animation="overlay"
        inverted
        vertical
        visible={sidebarVisible}
      >
        <h3>Your favorite and series!</h3>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading favorites.</p>}
        {favorites && favorites.length > 0
          ? favorites.map((media: Favorite) => (
              <FavoriteElement key={media.itemId} {...media} />
            ))
          : null}
      </Sidebar>
    </>
  )
}

export default FavoritesSidebar
