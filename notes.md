## React Lunch and Learn

- Problems with old frameworks/techniques
    + jQuery/Backbone
    + First want to stress that it is fine for lots of stuff (especially stateless DOM manipulation)
    + Can get very complicated at scale/complexity
        * InventoryBase editor - changes can from lots of different places, causing surprising results
        * Imperative - relies on ordering of statements and events
    + "Special" data models
        * Relies on inheritance, which has always been a bit of a hack in JS
        * As complexity increases, have to hack more often
    + Difficult to test
        * Requires DOM
    + Come back to Angular/Ember later
- High level description of how React works
    + We'll get into the details of "how" later (if we have time)
    + We interface with components, which return "elements" - which are lightweight JS objects, which describe UI with a type and some properties (Examples on: https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca#.qfo4knjg4)
    + The type can either be a DOM node (e.g. `div`) or another component
    + Therefore we can "compose" elements together by using a component a the elements type (show example of `DangerButton`)
        * React will recursively ask each element what it renders to and will get another element
    + This builds up a tree of elements
    + Eventually on the leaf nodes of the tree, all the elements will be DOM nodes
    + These are then converted to actual DOM nodes and inserted into the DOM
    + This is fine for the initial render, but how do updates happen?
        * We want the UI to change when state changes (sidenote: something that I didn't really consider before React properly as backend devs offload state mangement to the DB)
    + Components can specify behaviour that is triggered when DOM events have (clicks, scrolls, etc). Often this behaviour will result in a state change which will affect the UI (showing/hiding something etc)
    + When state changes (this is explicitly called), React will restart the process of building an element tree from scratch, which will eventually result in the DOM being updated
    + This sounds horrendously inefficient, but React has some clever tricks to make it really fast
        * The main one: the reconciler - after the element tree (VDOM) is rebuilt, the reconciler will compare the VDOM against the actual and compute the minimal changeset to update the actual DOM with, so subsequent updates are very small
    + (Sidenote: the very first version of React actually just replaced the entire DOM, as was supposedly resonably efficient!)
    + Summary: components build an element tree, which can be quickly "diffed" against the DOM tree to create the minimal changeset to update the DOM to the new state
- So how does React (at a high level) address previous problems?
    + Imperative vs Declarative
        * Imperative
            - Set of ordered statements that change a program's state
            - jQuery - statements which step through manipulating the DOM
        * Declarative
            - "What to compute, but not how to compute it" - in this context this would be directly manipulating the DOM, something that we don't do in React
            - We create a "description" of the DOM that we would like and React computes the actual DOM
            - React guarantees that given the same arguments, it will always return the same "description", and this description will always create the same DOM
                + UI = f(Data)
    + Functional composition of small components
        * Backbone (and Rails!) templates & partials tend to be quite large - often attempt to handle many things
        * React emphasises the use of many small, encapsulated, well named "components"
            - `Button`, `GravatarImg`, `TimeAgo`, `LoadingBar`, `Diff`, `ChangeStatistic`
        * These are reusable anywhere, if provided with correct arguments
            - Like functions (will come back to this later)
        * Single Responsibility Principle
            - It should do "one thing"
            - Alternatively, it's source code should have only one reason to change
            - I find it difficult to define component boundaries - experience, learning from others
        * Look at the practicalities of these later
    + Testing
        * Because React components return a "description" of DOM (React elements), not actual DOM, we don't need to mock out the DOM in tests
            - We can just test the element returned from individual components and make assertings against it
            - React guarantees (barring bugs) that the same description will always produce the same DOM
            - If you're paranoid, React can also turn a description into a string of HTML, and can then run assertions against that
        * Because components tend to be small, they are easier to test
        * Because React will always return the same description when given the same arguments, we can easily test all the different states that it has
            - Notoriously hard to test error states - with React, we can force an error state just by providing the relevant arguments
            - We can even provide documentation by rendering a component in every different state
- The how
    + Components
        * `var Button = React.createClass()`
        * In our codebase, we use the ES6 alternative but I want to focus on React rather than confuse with ES6
        * Must have a `render()` method, which returns a React element (the "description" of the desired UI)
        * This is almost always written in JSX
    + JSX
        * "Templating language" which maps HTML-like syntax (superset of XML) to React functions which create elements
            - `<div />` -> `React.createElement('div');`
            - `<Foo />` -> `React.createElement(Foo);` (where Foo is a component class)
        * Designed to make writing React more familiar & readable to traditional web developers, but ultimately it is just functions
        * Because it maps to regular JS functions, we can use regular JS inline with JSX (when wrapped with `{}`:
        * `<div>{Math.PI}</div>` -> `React.createElement('div', null, Math.PI)`
            - (Come back to the `null` argument in a bit)
        * Actual tranformation happens in a "build" step, run whenever a file edit is detected
            - Currently we are doing this with Gulp & Babel
    + Props
        * So we have just seen how to create static DOM with JSX, how do we pass in our data?
        * With "props", they are essentially like function arguments for components
        * Accessed within the component with `this.props`
        * In JSX: `<Foo thisIsA="prop" pi={Math.PI} />` -> `React.createElement(Foo, { thisIsA: "prop", pi: Math.PI })` - the second argument from before
        * When props change, the component is re-rendered
        * Props shouldn't be mutated by a component. If you need to change according to some input from the user, use state
    + State
        * Sort of similar to props in that it is like arguments for a component, except that state can't be shared between components - must be explicitly passed as props to child components
        * Accessed within the component with `this.state`
        * Can be set with `this.setState()` - this will trigger a re-render
            - This is the most common way of changing the UI in response to some input
    + "Escape hatches"
        * Ways to work with other libraries/styles
        * Mostly use the "lifecycle" methods like `componentDidMount` and `shouldComponentUpdate` to work directly with the DOM
        * We are doing this with the Timeline date range picker
- Useful references
    + [Official tutorial](https://facebook.github.io/react/docs/tutorial.html)
    + ["Thinking in React" - a good introduction to the philsophy of React](https://facebook.github.io/react/docs/thinking-in-react.html)
    + [React Components, Elements, and Instances](https://medium.com/@dan_abramov/react-components-elements-and-instances-90800811f8ca)
- Show examples?