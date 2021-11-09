import React from "react"
import { Sidebar, Menu } from "semantic-ui-react"
import useStore from "../Store/store"
import FavoriteElement from "./FavoriteElement"

const FavoritesSidebar = () => {
  const sidebarVisible = useStore((state) => state.sidebarVisible)
  const favoriteList = useStore((state) => state.favoriteList)

  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      inverted
      vertical
      visible={favoriteList.length > 0 ? sidebarVisible : false}
    >
      <h3>Your favorite movies!</h3>
      {favoriteList.length > 0
        ? favoriteList.map((movie) => (
            <FavoriteElement key={movie.imdbID} movie={movie} />
          ))
        : null}
    </Sidebar>
  )
}

export default FavoritesSidebar
