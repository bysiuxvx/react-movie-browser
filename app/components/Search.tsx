"use client"

import { useAtom } from "jotai"
import React, { useCallback, useEffect, useState } from "react"

import { Input, Container, Icon } from "semantic-ui-react"
import { mediaListAtom, mediaNotFoundAtom } from "../../store/store"
import { MediaDetails } from "../../models/MediaDetails"
import debounce from "lodash.debounce"
import { SearchItemTypes } from "../../enums/SearchItemTypes"

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [, setMediaList] = useAtom<MediaDetails[]>(mediaListAtom)
  const [, setMediaNotFound] = useAtom<boolean>(mediaNotFoundAtom)

  const API_URL: string = `/api/search?query=${searchValue}`
  const DEBOUNCE_TIME: number = 500

  const fetchMediaData = useCallback(() => {
    fetch(API_URL)
      .then((response) => {
        if (response.status === 404) {
          setMediaList([])
          setMediaNotFound(true)
          return
        }
        return response.json()
      })
      .then((data) => {
        const filteredMedia: MediaDetails[] = data.Search.filter(
          (media: MediaDetails) => media.Type !== SearchItemTypes.GAME
        )
        setMediaList(filteredMedia)
        setMediaNotFound(false)
      })
      .catch((error) => console.error("Fetch error:", error))
  }, [searchValue])

  const clearSearch = (): void => {
    setSearchValue("")
    setMediaList([])
    setMediaNotFound(false)
  }

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
            <Icon name="remove" inverted circular link onClick={clearSearch} />
          ) : null
        }
      />
    </Container>
  )
}

export default Search
