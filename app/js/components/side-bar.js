import React from 'react'
import { Platform, StyleSheet, Image, Dimensions } from 'react-native'
import { Content, Text, List, ListItem } from 'native-base'

export default class SideBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  getSideBarTheme () {
    return {
      // Line Height
      btnLineHeight: 19,
      lineHeightH1: 32,
      lineHeightH2: 27,
      lineHeightH3: 22,
      iconLineHeight: (Platform.OS === 'ios') ? 37 : 30,
      lineHeight: (Platform.OS === 'ios') ? 20 : 24,

      // List
      listBorderColor: '#fff',
      listDividerBg: '#ddd',
      listItemHeight: 45,
      listItemPadding: 10,
      listNoteColor: '#808080',
      listNoteSize: 13
    }
  }

  render () {
    return (
      <Content
        theme={this.getSideBarTheme()}
        style={styles.sidebar}
      >
        <Image source={require('../../images/UAI.jpg')} style={styles.image} />
        <List>
          <ListItem button style={styles.listItem} onPress={() => { this.props.navigate('news') }}>
            <Text>Noticias</Text>
          </ListItem>
          <ListItem button style={styles.listItem} onPress={() => { this.props.navigate('surveys') }}>
            <Text>Encuestas</Text>
          </ListItem>
          <ListItem button style={styles.listItem} onPress={() => { this.props.navigate('votings') }}>
            <Text>Votaciones</Text>
          </ListItem>
        </List>
      </Content>
    )
  }
}

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    resizeMode: 'cover',
    height: deviceHeight * 0.25,
    width: deviceWidth * 0.8
  },
  listItem: {
    height: 60,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1
  }
})
