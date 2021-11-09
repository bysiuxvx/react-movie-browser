import React from "react"
import useStore from "../Store/store"
import { Input, Container, Icon } from "semantic-ui-react"

const Search = (props) => {
  const searchValue = useStore((state) => state.searchValue)
  const setSearchValue = useStore((state) => state.setSearchValue)

  return (
    <Container className="search-container">
      <Input
        className="search-input"
        size="big"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Search for a movie :)"
        icon={
          searchValue ? (
            <Icon
              name="search"
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
