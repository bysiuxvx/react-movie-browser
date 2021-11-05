import React from "react"
import MovieList from "./Components/MovieList"
import Search from "./Components/Search"
import MovieModal from "./Components/Modal"
import FavoritesSidebar from "./Components/FavoritesSidebar"
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Container,
} from "semantic-ui-react"

const Layout = () => {
  const [visible, setVisible] = React.useState(true)

  return (
    <div className="layout">
      {/* <Sidebar.Pushable>
        <Sidebar
          as={Segment}
          animation="overlay"
          direction="left"
          icon="labeled"
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width="thin"
        >
          <FavoritesSidebar />
          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <Checkbox
                checked={visible}
                label={{ children: <code>visible</code> }}
                onChange={(e, data) => setVisible(data.checked)}
              /> */}
      <Search />
      <MovieList />
      <MovieModal />
      {/* </Segment>
          </Sidebar.Pusher>
        </Sidebar>
      </Sidebar.Pushable> */}
    </div>
  )
}

export default Layout
