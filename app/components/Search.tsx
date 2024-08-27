"use client"

import { useAtom } from "jotai"
import React, { useCallback, useEffect, useState } from "react"

import { Input, Container, Icon } from "semantic-ui-react"
import { mediaListAtom } from "../../store/store"
import { MediaDetails } from "../../models/MediaDetails"
import debounce from "lodash.debounce"
import { SearchItemTypes } from "../../enums/SearchItemTypes"

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [, setMediaList] = useAtom<MediaDetails[]>(mediaListAtom)

  const API_URL: string = `/api/search?query=${searchValue}`
  const DEBOUNCE_TIME: number = 500

  const fetchMediaData = useCallback(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        const filteredMedia: MediaDetails[] = data.Search.filter(
          (media: MediaDetails) => media.Type !== SearchItemTypes.GAME
        )
        setMediaList(filteredMedia)
      })
      .catch((error) => console.error("Fetch error:", error))
  }, [searchValue])

  useEffect(() => {
    if (!searchValue) {
      setMediaList([])
      return
    }

    const debouncedFetchData = debounce(fetchMediaData, DEBOUNCE_TIME)
    debouncedFetchData()

    return () => {
      debouncedFetchData.cancel()
    }
  }, [searchValue, fetchMediaData])

  return (
    <Container className="search-container">
      <Input
        className="search-input"
        size="big"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Search for a movie or series :)"
        icon={
          searchValue ? (
            <Icon
              name="remove"
              inverted
              circular
              link
              onClick={() => setSearchValue("")}
            />
          ) : null
        }
      />
    </Container>
  )
}

export default Search
