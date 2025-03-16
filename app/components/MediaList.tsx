"use client"

import React from "react"

import { useAtom } from "jotai"
import { mediaListAtom, mediaNotFoundAtom } from "../../store/store"

import MediaItem from "./MediaItem"

import { MediaDetails } from "../../models/MediaDetails"

const MediaList = () => {
  const [mediaList] = useAtom(mediaListAtom)
  const [mediaNotFound] = useAtom(mediaNotFoundAtom)

  return (
    <>
      {!!mediaList && !mediaNotFound && (
        <div className="list-container">
          {mediaList.map((media: MediaDetails) => (
            <MediaItem {...media} key={media.imdbID} />
          ))}
        </div>
      )}

      {mediaNotFound && (
        <div className="media-not-found">
          <h3>Media not found</h3>
        </div>
      )}
    </>
  )
}

export default MediaList
