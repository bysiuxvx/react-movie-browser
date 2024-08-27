"use client"

import React from "react"
import { modalDetailsAtom } from "../../store/store"
import { Card, Container } from "semantic-ui-react"
import { useAtom } from "jotai"
import { MediaDetails } from "../../models/MediaDetails"
import Image from "next/image"

const MediaItem = (media: MediaDetails) => {
  const [, setModalDetails] = useAtom(modalDetailsAtom)
  const URL: string = `/api/search/id?movieId=${media.imdbID}`

  const getMediaDetails = async () => {
    try {
      const response = await fetch(URL)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setModalDetails(data)
    } catch (error: any) {
      console.log("Error fetching media details:", error)
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`)
      } else {
        console.log("An unexpected error occurred. Please try again later.")
      }
    }
  }

  return (
    <Card className="media-element" onClick={() => getMediaDetails()}>
      <Container className="media-element-img-container">
        <Image
          src={media.Poster}
          alt={`Poster for ${media.Title}`}
          width={160}
          height={240}
          className="media-element-img"
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
