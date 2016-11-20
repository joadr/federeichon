import React from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base'
import { Text, StyleSheet } from 'react-native'
import theme from '../theme/federeichon-theme'

const propTypes = {

}

export default class News extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    this.props.acceptPan()
  }

  render () {
    return (
      <Container style={styles.container}>
        <Header theme={theme}>
          <Button onPress={() => this.context.drawer.open()} transparent>
            <Icon name='md-menu' />
          </Button>
          <Title>Noticias</Title>
        </Header>
        <Content>
          <Text>Holaa csm3!!</Text>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
})

News.propTypes = propTypes
News.contextTypes = {
  drawer: React.PropTypes.any
}
