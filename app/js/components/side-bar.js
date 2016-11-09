import React from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base'
import { Text, StyleSheet } from 'react-native'

const propTypes = {
  navigator: React.PropTypes.any
}

export default class SideBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Container>
        <Header>
          <Title>Federeichon</Title>
        </Header>
        <Content>
          <Text>Holaa csm3!!</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button transparent>
              <Icon name='ios-call' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
})

SideBar.propTypes = propTypes
