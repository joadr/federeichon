import React from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base'
import { Text, StyleSheet } from 'react-native'

const propTypes = {

}

export default class News extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Container style={styles.container}>
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
  container: {
    backgroundColor: 'white'
  }
})

News.propTypes = propTypes
