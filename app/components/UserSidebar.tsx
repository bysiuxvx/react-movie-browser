"use client"

import React, { useEffect, useState } from "react"

import FavoriteElement from "./FavoriteElement"

import {
  Sidebar,
  Menu,
  Accordion,
  AccordionTitle,
  Icon,
  AccordionContent,
} from "semantic-ui-react"
import { sidebarVisibleAtom } from "../../store/store"
import { useAtom } from "jotai"
import { Favorite, Rating } from "@prisma/client"
import { useFavorites } from "../utils/favorites-actions"
import { UserButton } from "@clerk/nextjs"
import { useRatings } from "../utils/ratings-actions"
import RatedElement from "./RatedSidebarElement"
const UserSidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useAtom(sidebarVisibleAtom)

  const { favorites, isLoading, isError } = useFavorites()
  const {
    ratings,
    isLoading: ratingsLoading,
    isError: ratingsError,
  } = useRatings()

  const [active, setActive] = useState({
    favorites: false,
    ratings: false,
  })

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
        <div className="user-button">
          <UserButton />
        </div>
        <h3>Your favorite and series!</h3>
        <Accordion fluid>
          <AccordionTitle
            active={active.favorites}
            index={0}
            onClick={() => {
              if (!favorites?.length) return
              setActive({ ...active, favorites: !active.favorites })
            }}
            style={{
              color: "white",
              fontWeight: "bold",
              marginTop: "10px",
              cursor: favorites?.length ? "pointer" : "default",
            }}
          >
            {favorites?.length ? <Icon name="dropdown" /> : null}
            Favorites {`(${favorites?.length || 0})`}
          </AccordionTitle>
          <AccordionContent
            active={active.favorites}
            className="accordion-container"
          >
            {favorites && favorites.length > 0
              ? favorites.map((media: Favorite) => (
                  <FavoriteElement key={media.itemId} {...media} />
                ))
              : null}
          </AccordionContent>
        </Accordion>

        <Accordion fluid>
          <AccordionTitle
            active={active.ratings}
            index={1}
            onClick={() => {
              if (!ratings?.length) return
              setActive({ ...active, ratings: !active.ratings })
            }}
            style={{
              color: "white",
              fontWeight: "bold",
              marginTop: "10px",
              cursor: ratings?.length ? "pointer" : "default",
            }}
          >
            <Icon name="dropdown" />
            Reviewed {`(${ratings?.length || 0})`}
          </AccordionTitle>
          <AccordionContent
            active={active.ratings}
            className="accordion-container"
          >
            {ratings && ratings.length > 0
              ? ratings.map((media: Rating) => (
                  <RatedElement key={media.itemId} {...media} />
                ))
              : null}
          </AccordionContent>
        </Accordion>
      </Sidebar>
    </>
  )
}

export default UserSidebar
