import React from 'react'
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import Meteor, { createContainer } from 'react-native-meteor'
import theme from '../theme/federeichon-theme'
import prune from 'underscore.string/prune'

const propTypes = {

}

class Surveys extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  renderNews () {
    return this.props.surveys.map((survey, index) => {
      return (
        <Card key={index}>
          <CardItem header onPress={() => { this.props.navigator.push({ name: 'singleSurvey', id: survey._id }) }}>
            <Text style={styles.title}>{survey.title}</Text>
          </CardItem>
          <CardItem onPress={() => { this.props.navigator.push({ name: 'singleSurvey', id: survey._id }) }}>
            <Text>{prune(survey.description, 200)}</Text>
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
          <Title>Encuestas</Title>
        </Header>
        <Content>
          {this.renderNews()}
        </Content>
      </Container>
    )
  }
}

export default createContainer(() => {
  const handle = Meteor.subscribe('surveys-index')
  const surveys = Meteor.collection('surveys').find()

  return {
    surveysReady: handle.ready(),
    surveys: surveys
  }
}, Surveys)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

Surveys.propTypes = propTypes
Surveys.contextTypes = {
  drawer: React.PropTypes.any
}
