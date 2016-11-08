import React from 'react'
import { Container, Content, Text } from 'native-base'

const propTypes = {

}

export default class NotFound extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Container>
        <Content>
          <Text>No encontrado :(</Text>
        </Content>
      </Container>
    )
  }
}

NotFound.propTypes = propTypes
