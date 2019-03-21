import React, { Component } from "react"

const Home = () => <h1> Home page</h1>

const About = () => <h1> About</h1>

const Contact = () => <h1>Contact</h1>

const RoutingContext = React.createContext()

class Router extends Component {
  state = {
    location: window.location
  }
  handlePopState = () => {
    this.setState({ location: window.location })
  }

  push = url => {
    window.history.pushState(null, null, url)
    this.setState({ location: window.location })
  }

  componentDidMount() {
    window.addEventListener("popstate", this.handlePopState)
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePopState)
  }
  render() {
    const { location } = this.state
    console.log(location.pathname)
    return (
      <RoutingContext.Provider
        {...this.props}
        value={{ location, push: this.push }}
      />
    )
  }
}

const Route = ({ path, component: Component }) => (
  <RoutingContext.Consumer>
    {({ location }) => (location.pathname === path ? <Component /> : null)}
  </RoutingContext.Consumer>
)
const Link = ({ to, children }) => (
  <RoutingContext.Consumer>
    {({ push }) => (
      <a
        href={to}
        onClick={event => {
          event.preventDefault()
          push(to)
        }}
      >
        {children}
      </a>
    )}
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
                <Link to="/about">About </Link>
              </li>
              <li>
                <Link to="/home">Home </Link>
              </li>
              <li>
                <Link to="/contact">Contact </Link>
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
