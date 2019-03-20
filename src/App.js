import React, { Component } from "react"

const Home = () => <h1> Home page</h1>

const About = () => <h1> About</h1>

const Contact = () => <h1>Contact</h1>

class App extends Component {
  state = {
    location: window.location
  }
  render() {
    const { pathname } = this.state.location
    let Child
    switch (pathname) {
      case "/about":
        Child = About
        break
      case "/home":
        Child = Contact
        break
      default:
        Child = Home
    }
    return (
      <>
        <nav>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/home">Home</a>
            </li>
          </ul>
        </nav>
        <Child />
      </>
    )
  }
}
export default App
