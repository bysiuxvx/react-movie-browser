import React from "react"
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
import useStore from "../Store/store"

const FavoritesSidebar = () => {
  const [visible, setVisible] = React.useState(false)

  const favoriteList = useStore((state) => state.favoriteList)

  return (
    <>
      {/* <Checkbox
        checked={visible}
        label={{ children: <code>visible</code> }}
        onChange={(e, data) => setVisible(data.checked)}
      />

      <Sidebar.Pushable 
    //   as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width="thin"
        > */}
      {/* <Menu.Header>Your favovites:</Menu.Header>
      {favoriteList.length > 0 &&
        favoriteList.map((movie) => (
          <Menu.Item as="a">
            {movie.Title} - {movie.Year}
          </Menu.Item>
        ))} */}

      {/* <Menu.Item as="a">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
            Channels
          </Menu.Item> */}
      {/* </Sidebar>

        <Sidebar.Pusher dimmed={visible}>
          <Segment basic>
            <Header as="h3">Favlist count {favoriteList.length}</Header>
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable> */}
    </>
  )
}

export default FavoritesSidebar
