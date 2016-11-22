import React from 'react'
import { Container, Header, Title, Content, Button, Icon, Text } from 'native-base'
import Meteor, { createContainer } from 'react-native-meteor'
import { StyleSheet } from 'react-native'
import theme from '../theme/federeichon-theme'

const propTypes = {

}

class SingleNew extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Container style={styles.container}>
        <Header theme={theme}>
          <Button onPress={() => this.context.drawer.open()} transparent>
            <Icon name='md-menu' />
          </Button>
          <Title>Noticia</Title>
        </Header>
        <Content style={styles.content}>
          <Text style={styles.title}>{this.props.singleNew.title}</Text>
          <Text>{this.props.singleNew.createdAt}</Text>
          <Text>{this.props.singleNew.body}</Text>
        </Content>
      </Container>
    )
  }
}

export default createContainer(({id}) => {
  const handle = Meteor.subscribe('edit-news-byId', id)
  const singleNew = Meteor.collection('news').findOne({_id: id})

  return {
    newsReady: handle.ready(),
    singleNew: singleNew
  }
}, SingleNew)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  title: {
    fontSize: 30,
    height: 35,
    fontWeight: 'bold'
  },
  content: {
    padding: 10
  }
})

SingleNew.propTypes = propTypes
SingleNew.contextTypes = {
  drawer: React.PropTypes.any
}

