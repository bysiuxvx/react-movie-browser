"use client"

import React, { useEffect } from "react"

import useStore from "../../store/store"

import FavoriteElement from "./FavoriteElement"

import { Sidebar, Menu } from "semantic-ui-react"

const FavoritesSidebar = () => {
  const sidebarVisible = useStore((state) => state.sidebarVisible)
  const favoriteList = useStore((state) => state.favoriteList)
  const setSidebarVisible = useStore((state) => state.setSidebarVisible)

  useEffect(() => {
    if (favoriteList.length === 0) setSidebarVisible(false)
  }, [favoriteList])

  return (
    <>
      <Sidebar
        as={Menu}
        animation="overlay"
        inverted
        vertical
        visible={sidebarVisible}
      >
        <h3>Your favorite movies!</h3>
        {favoriteList.length > 0
          ? favoriteList.map((movie) => (
              <FavoriteElement key={movie.imdbID} movie={movie} />
            ))
          : null}
      </Sidebar>
    </>
  )
}

export default FavoritesSidebar
