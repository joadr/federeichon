import React from 'react'
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, List, ListItem } from 'native-base'
import Meteor, { createContainer } from 'react-native-meteor'
import { StyleSheet, View } from 'react-native'
import theme from '../theme/federeichon-theme'
import { Form, Field } from 'simple-react-form'
import Radio from '../components/radio'
import moment from 'moment'
import _ from 'underscore'

const propTypes = {

}

class SingleSurvey extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   console.log('next:', nextState)
  //   return true
  // }

  renderFields () {
    var papu = this.props.singleSurvey.questions.map((question, index) => {
      return (
        <ListItem>
          <Text>{question.question}</Text>
          <Field fieldName={question.slug} type={Radio} options={question.options} />
        </ListItem>
      )
    })
    console.log(papu)
    return papu
  }

  render () {
    return (
      <Container style={styles.container}>
        <Header theme={theme}>
          <Button onPress={() => this.context.drawer.open()} transparent>
            <Icon name='md-menu' />
          </Button>
          <Title>Encuesta</Title>
        </Header>
        <Content style={styles.content}>
          <Text style={styles.title}>{this.props.singleSurvey.title}</Text>
          <Text>{moment(this.props.singleSurvey.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
          <Text>{this.props.singleSurvey.description}</Text>
          <Card style={{marginTop: 25, paddingBottom: 25}}>
            <CardItem header>
              <Text style={styles.cardTitle}>Opciones</Text>
            </CardItem>
            <CardItem>
              <Form
                state={this.state}
                onChange={changes => this.setState(changes)}
                useFormTag={false}
              >
                <List>
                  {this.renderFields()}
                </List>
              </Form>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default createContainer(({id}) => {
  const handle = Meteor.subscribe('edit-surveys-byId', id)
  const singleSurvey = Meteor.collection('surveys').findOne({_id: id})

  singleSurvey.options = _.map(singleSurvey.options, (option) => {
    option.label = option.name
    option.value = option.name
    return option
  })

  return {
    newsReady: handle.ready(),
    singleSurvey: singleSurvey
  }
}, SingleSurvey)

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
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

SingleSurvey.propTypes = propTypes
SingleSurvey.contextTypes = {
  drawer: React.PropTypes.any
}

