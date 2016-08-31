require("normalize.css");
require("spectacle/lib/themes/default/index.css");

import React, { Component } from 'react'
import {
  Spectacle,
  Deck,
  Slide,
  Heading,
  Image,
  List,
  ListItem,
  Code,
  Appear,
  CodePane,
  Text,
  Link,
  Layout,
  Fit,
  Fill
} from 'spectacle'
import createTheme from "spectacle/lib/themes/default";
import preloader from "spectacle/lib/utils/preloader";

const theme = createTheme({
  primary: '#f7df1e'
})

const images = {
  logo: require('../assets/logo.svg'),
  treeDiff: require('../assets/react-render-tree.png')
}

preloader(images)

export default class LunchAndLearn extends Component {
	render() {
		return (
		  <Spectacle theme={theme}>
        <Deck progress="bar">
          <Slide>
            <Heading textColor="secondary">React.js</Heading>
            <Image src={images.logo} height={200} margin="40px auto" />
            <Heading textColor="secondary">Lunch and Learn</Heading>
          </Slide>

          <Slide>
            <CodePane
              lang="javascript"
              source={require('raw!../assets/contrived.example')}
            />
            <Text textSize={30}>A contrived example from&nbsp;
              <Link italic href="https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca">
                React Components, Elements, and Instances
              </Link>
            </Text>
          </Slide>

          <Slide>
            <Heading fit textColor="secondary">So how does it work?</Heading>
          </Slide>

          <Slide>
            <List>
              <ListItem>We create "components", which return React "elements" -
                lightweight Javascript objects, which describe a small part of the UI</ListItem>
              <Appear><ListItem>An element contains a type and some properties</ListItem></Appear>
            </List>
          </Slide>

          <Slide>
            <Layout>
              <Fill>
                <Text>Element</Text>
                <CodePane
                  lang="javascript"
                  source={require('raw!../assets/element.example')}
                />
              </Fill>
              <Fill>
                <Text>renders to</Text>
                <Text>→</Text>
              </Fill>
              <Fill>
                <Text>DOM node</Text>
                <CodePane
                  lang="html"
                  source={require('raw!../assets/elementHtml.example')}
                />
              </Fill>
            </Layout>
          </Slide>

          <Slide>
            <List>
              <ListItem>An element's type can be a DOM node (e.g. <Code>div</Code>)</ListItem>
              <Appear><ListItem>Or another component</ListItem></Appear>
              <Appear><ListItem>Elements can be "composed" together</ListItem></Appear>
            </List>
          </Slide>

          <Slide>
            <Layout>
              <Fill>
                <Text margin="15px auto"><Code>WarningButton</Code></Text>
                <CodePane
                  lang="javascript"
                  source={require('raw!../assets/warningButton.example')}
                />
              </Fill>
              <Fit>
                <Text>&nbsp;</Text>
              </Fit>
              <Fill>
                <Text margin="15px auto"><Code>Button</Code></Text>
                <CodePane
                  lang="javascript"
                  source={require('raw!../assets/button.example')}
                />
              </Fill>
            </Layout>
            <Text margin="60px auto">Notice how <Code textSize={35}>WarningButton</Code> uses a Component variable instead of a string</Text>
          </Slide>

          <Slide>
            <Heading textColor="secondary" fit>Rendering</Heading>
            <Appear>
              <List>
                <ListItem>React will recursively ask each element what it renders, building up a tree of elements</ListItem>
                <Appear><ListItem>Eventually it reaches a leaf node where every element renders to a DOM node</ListItem></Appear>
                <Appear><ListItem>This tree of elements is then converted to actual DOM nodes and inserted into the document</ListItem></Appear>
              </List>
            </Appear>
          </Slide>

          <Slide>
            <Heading textColor="secondary" fit>What about updates?</Heading>
            <Appear>
              <List>
                <ListItem>Components can specify what happens when DOM events are triggered
                  (e.g. <Code textSize={35}>click</Code>, <Code textSize={35}>scroll</Code>), resulting in a state change</ListItem>
                <Appear><ListItem>When state changes, React will rebuild the element tree from scratch with the new state,
                  eventually resulting in the DOM being replaced</ListItem></Appear>
              </List>
            </Appear>
          </Slide>

          <Slide>
            <Heading textColor="secondary">That sounds inefficient!</Heading>
            <List>
              <ListItem>It was! The first version of React just computed the new tree, then dumped it into the DOM</ListItem>
              <Appear><ListItem>Now React has a few tricks to make this really fast</ListItem></Appear>
            </List>
          </Slide>

          <Slide>
            <List margin="0 auto">
              <ListItem>React's "reconciler" is smart about how it updates the DOM. It compares the element tree (often
                called the Virtual DOM) against the real DOM</ListItem>
              <Appear><ListItem>From the comparison it computes the minimal change set needed to get the DOM tree in
                the same state as the VDOM</ListItem></Appear>
              <Appear>
                <Image src={images.treeDiff} margin="10px auto 0" />
              </Appear>
              <Appear><ListItem>In addition, the reconciler's tree diffing algorithm uses a bunch of heuristics to speed up what is traditionally a slow operation</ListItem></Appear>
            </List>
          </Slide>

          <Slide>
            <Heading textColor="secondary">Recap</Heading>
            <Text margin="20px auto">React uses the components to recursively build a "virtual" element tree, which can be quickly "diffed"
            against the real DOM tree to create the minimal change set of operations which will update the real DOM to match the
            virtual DOM</Text>
          </Slide>

          <Slide>
            <Heading textColor="secondary" fit>The how (in detail)</Heading>
          </Slide>

          <Slide>
            <Heading textColor="secondary" margin="0 auto 40px">Components</Heading>
            <Appear>
              <CodePane
                lang="jsx"
                textSize={16}
                source={require('raw!../assets/component.example')}
              />
            </Appear>
          </Slide>

          <Slide>
            <Heading textColor="secondary" textSize={65} margin="0 auto">JSX</Heading>
            <List margin="10px auto">
              <ListItem>"Templating language" with a HTML-like syntax</ListItem>
              <Appear><ListItem>Helps to make components more readable & familiar</ListItem></Appear>
              <Appear>
                <ListItem>
                  Maps to functions which create elements
                  <Text textAlign="center" textSize={30} lineHeight={1.2}><Code textSize={30}>{'<div />'}</Code> → <Code textSize={30}>{'React.createElement("div");'}</Code></Text>
                  <Text textAlign="center" textSize={30} lineHeight={1.2}><Code textSize={30}>{'<Foo />'}</Code> → <Code textSize={30}>{'React.createElement(Foo);'}</Code></Text>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  Because it directly maps to regular JS functions, we can use regular JS inline:
                  <Layout>
                    <Fill>
                      <Text lineHeight={0.9}><Code textSize={30}>{'<div>{Math.PI}</div>'}</Code></Text>
                    </Fill>
                    <Fill>
                      <Text lineHeight={0.9}><Code textSize={30}>{'React.createElement("div", null, Math.PI);'}</Code></Text>
                    </Fill>
                  </Layout>
                </ListItem>
              </Appear>
              <Appear><ListItem>Transformation is done in the "build" step, currently using Gulp & Babel</ListItem></Appear>
            </List>
          </Slide>

          <Slide>
            <Heading textColor="secondary">Props</Heading>
            <List>
              <ListItem>Props are essentially arguments passed to the component</ListItem>
              <Appear>
                <ListItem>
                  Passing props in JSX:
                  <Text lineHeight={0.9} margin="5px auto 10px"><Code textSize={30}>{'<Foo thisIsA="prop" pi={Math.PI} />'}</Code></Text>
                  <Text lineHeight={0.9} margin="10px auto"><Code textSize={30}>{'React.createElement(Foo, { thisIsA: "prop", pi: Math.PI })'}</Code></Text>
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>Then within the <Code textSize={35}>Foo</Code> component <Code textSize={35}>isIsAProp</Code> and <Code textSize={35}>pi</Code> can be accessed within <Code textSize={35}>this.props</Code></ListItem>
              </Appear>
              <Appear><ListItem>When a component's props have changed it re-renders to update the UI with the new "arguments"</ListItem></Appear>
            </List>
          </Slide>

          <Slide>
            <Heading textColor="secondary">State</Heading>
            <List>
              <ListItem>Similar to <Code textSize={35}>props</Code> in that it acts like arguments for the component, except that <Code textSize={35}>state</Code> can be mutated</ListItem>
              <Appear><ListItem>State can be mutated with <Code textSize={35}>this.setState()</Code>, which will trigger a re-render</ListItem></Appear>
              <Appear><ListItem>This is the most common way of updating the UI in response to input from the user</ListItem></Appear>
              <Appear><ListItem>Accessed within the component with <Code textSize={35}>this.state</Code></ListItem></Appear>
            </List>
          </Slide>

          <Slide align="flex-start">
            <CodePane
              lang="jsx"
              source={require('raw!../assets/stateAndProps.example')}
              textSize={15}
            />
          </Slide>

          <Slide>
            <Heading textColor="secondary">References</Heading>
            <List>
              <ListItem><Link href="https://facebook.github.io/react/docs/tutorial.html">Official tutorial</Link></ListItem>
              <ListItem><Link href="https://facebook.github.io/react/docs/thinking-in-react.html">'Thinking in React'</Link></ListItem>
              <ListItem><Link href="https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca">React Components, Element and Instances</Link></ListItem>
              <ListItem><Link href="http://calendar.perfplanet.com/2013/diff/">React's diff algorithm</Link></ListItem>
            </List>
          </Slide>
        </Deck>
      </Spectacle>
    )
	}
}
