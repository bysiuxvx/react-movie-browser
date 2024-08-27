"use client"

import React from "react"
import axios from "axios"

import { modalDetailsAtom } from "../../store/store"

import { Card, Image, Container } from "semantic-ui-react"
import { useAtom } from "jotai"
import { MediaDetails } from "../../models/MediaDetails"

const MediaItem = (media: MediaDetails) => {
  const [, setModalDetails] = useAtom(modalDetailsAtom)
  const URL: string = `/api/search/id?movieId=${media.imdbID}`

  const getMediaDetails = () => {
    axios
      .get(URL)
      .then(({ data }) => {
        setModalDetails(data)
      })
      .catch((error) => console.log(error))
  }

  return (
    <Card className="media-element" onClick={() => getMediaDetails()}>
      <Container className="media-element-img-container">
        <Image
          src={media.Poster}
          alt={`poster unavailable`}
          wrapped
          className="media-element-img"
          centered
        />
      </Container>
      <Card.Content>
        <Card.Header>{media.Title}</Card.Header>
        <Card.Description>
          <p>{media.Year}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default MediaItem
