import React from 'react'
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import Meteor, { createContainer } from 'react-native-meteor'
import theme from '../theme/federeichon-theme'
import prune from 'underscore.string/prune'

const propTypes = {

}

class News extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    this.props.acceptPan()
  }

  renderNews () {
    return this.props.news.map((noticia, index) => {
      return (
        <Card key={index}>
          <CardItem header onPress={() => { this.props.navigator.push({ name: 'singleNew', id: noticia._id }) }}>
            <Text style={styles.title}>{noticia.title}</Text>
          </CardItem>
          <CardItem onPress={() => { this.props.navigator.push({ name: 'singleNew', id: noticia._id }) }}>
            <Text>{prune(noticia.body, 200)}</Text>
          </CardItem>
        </Card>
      )
    })
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
          {this.renderNews()}
        </Content>
      </Container>
    )
  }
}

export default createContainer(() => {
  const handle = Meteor.subscribe('news-index')
  const news = Meteor.collection('news').find()

  return {
    newsReady: handle.ready(),
    news: news
  }
}, News)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

News.propTypes = propTypes
News.contextTypes = {
  drawer: React.PropTypes.any
}
