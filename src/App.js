import React, { Component } from "react"

const Home = () => <h1> Home page</h1>

const About = () => <h1> About</h1>

const Contact = () => <h1>Contact</h1>

const RoutingContext = React.createContext()

class Router extends Component {
  state = {
    location: window.location
  }
  render() {
    const { location } = this.state
    return <RoutingContext.Provider {...this.props} value={{ location }} />
  }
}

const Route = ({ path, component: Component }) => (
  <RoutingContext.Consumer>
    {({ location }) => (location.pathname === path ? <Component /> : null)}
  </RoutingContext.Consumer>
)

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <nav>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>

          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </>
      </Router>
    )
  }
}
export default App
