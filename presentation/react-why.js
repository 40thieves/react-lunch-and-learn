require("normalize.css");
require("spectacle/lib/themes/default/index.css");

import React, { Component, PropTypes } from 'react'
import {
  Spectacle,
  Deck,
  Slide,
  Heading,
  List,
  ListItem,
  Code,
  Appear,
  Text,
  Layout,
  Fill
} from 'spectacle'

import createTheme from "spectacle/lib/themes/default";

const theme = createTheme({
  primary: '#f7df1e'
})

export default class ReactWhy extends Component {
	render() {
		return (
		  <Spectacle theme={theme}>
        <Deck progress="bar">
          <Slide>
            <Heading fit textColor="secondary" margin="5px auto">What's the problem with</Heading>
            <Heading fit textColor="secondary" margin="5px auto">jQuery and Backbone?</Heading>
          </Slide>

          <Slide>
            <List>
              <ListItem>Large amount of complexity at scale</ListItem>
              <ListItem>Hard to reason about, as state changes can come from anywhere</ListItem>
              <ListItem>Large complex templates</ListItem>
              <ListItem>Relies on "special" data models (e.g. <Code textSize={35}>Backbone.Model</Code>)</ListItem>
              <ListItem>Difficult to test because it is coupled to the DOM</ListItem>
            </List>
          </Slide>

          <Slide>
            <Heading textColor="secondary" fit>So how does React address these problems?</Heading>
          </Slide>

          <Slide>
            <Heading textColor="secondary" textSize={50} margin="0 auto 30px">Imperative vs Declarative</Heading>
            <Layout>
              <Fill>
                <Text bold>Imperative</Text>
                <Text textAlign="center" lineHeight={1.2}>Set of ordered statements that change a program's state,
                  in this context, we directly manipulate the DOM through jQuery</Text>
              </Fill>
              <Fill>
                <Text bold>Declarative</Text>
                <Text textAlign="center" lineHeight={1.2}>"What to compute, not how to compute it", in this
                  context, we give React a description of the UI and it computes how to manipulate the DOM</Text>
              </Fill>
            </Layout>
            <Text margin="40px auto 0">Declarative programming frees us to more clearly think about the UI that should be
              rendered when given various states</Text>
          </Slide>

          <Slide>
            <Text textAlign="left" lineHeight={1.2} margin="0 auto 40px">React guarantees that given the same arguments, it will always render the same UI</Text>
            <Appear><Text textAlign="center" lineHeight={1.2} margin="40px auto"><Code>UI = f(data)</Code></Text></Appear>
            <Appear><Text bold>This allows us to focus on finding all the required states and working on them in isolation</Text></Appear>
          </Slide>

          <Slide>
            <Text textAlign="left" lineHeight={1.2} margin="0 auto 40px">Data always flows through React from
              the top of the tree downwards</Text>
            <Appear><Text textAlign="left" lineHeight={1.2} margin="40px auto">Components change the state, causing a re-render,
              which passes the new data down from the top of the tree</Text></Appear>
            <Appear><Text bold>State changes become much easier to reason about, as changes can only come from a
              component's parent</Text></Appear>
          </Slide>

          <Slide>
            <Text textAlign="left" lineHeight={1.2} margin="0 auto 40px">Templates in other frameworks (even Rails) tend to be
              quite large and handle many different UI states</Text>
            <Appear>
              <Text textAlign="left" lineHeight={1.2} margin="40px auto">
                React emphasises small, encapsulated, well-named "components"
                <Text textAlign="center" lineHeight={1.2}><Code textSize={35}>Button</Code>,&nbsp;<Code textSize={35}>LoadingBar</Code>,&nbsp;<Code textSize={35}>GravatarImg</Code>,
                  &nbsp;<Code textSize={35}>Diff</Code>,&nbsp;<Code textSize={35}>ChangeStatistic</Code></Text>
              </Text>
            </Appear>
            <Appear><Text bold>By splitting & containing complexity, components help to keep logic focused and readable</Text></Appear>
          </Slide>

          <Slide>
            <Text textAlign="left" lineHeight={1.2} margin="0 auto 40px">A React element is a represents the desired DOM,
              but is not directly linked to the DOM</Text>
            <Appear><Text textAlign="left" lineHeight={1.2} margin="40px auto">Therefore tests can assert against elements
              without having to run in a browser or mock the DOM</Text></Appear>
            <Appear><Text textAlign="left" lineHeight={1.2} margin="40px auto">Testing error states (traditionally hard to
              test) is trivial as the relevant error arguments can just be set on the component</Text></Appear>
            <Appear><Text bold>Testing React significantly faster and easier than previous methods</Text></Appear>
          </Slide>
        </Deck>
      </Spectacle>
		)
	}
}
