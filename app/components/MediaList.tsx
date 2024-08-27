"use client"

import React from "react"

import { useAtom } from "jotai"
import { mediaListAtom } from "../../store/store"

import MediaItem from "./MediaItem"

import { MediaDetails } from "../../models/MediaDetails"
import { CardGroup } from "semantic-ui-react"

const MediaList = () => {
  const [mediaList] = useAtom(mediaListAtom)

  return (
    <>
      {mediaList && (
        <div className="list-container">
          {mediaList.map((media: MediaDetails) => (
            <MediaItem {...media} key={media.imdbID} />
          ))}
        </div>
      )}
    </>
  )
}

export default MediaList
