import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Minsk", location: {lat: "53.902016", lng: "27.552182"}},
  { name: "Warshaw", location: {lat: "52.223182",lng: "21.050202"} },
  { name: "New York", location: {lat:"40.633183", lng: "-73.975386"} },
  { name: "Abu Dhabi", location: {lat:"24.377407", lng: "54.544804"} }
];

class LocalTime extends Component{
  constructor(){
    super();
    this.state = {
      timeData: null
    }
  }
  componentWillMount(){
    const location = this.props.location;
    const URL = "http://api.timezonedb.com/v2/get-time-zone?key=DGXBU69S9PBN&format=json&by=position&lat=" + location.lat + 
      "&lng=" + location.lng

    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ timeData: json });
    });
  }
  render(){
    const timeData = this.state.timeData;
    if(!timeData) return <div>Loading...</div>
    return(
      <div>
        <h1>{timeData.formatted}</h1>
        <h2>{timeData.zoneName} GMT: {timeData.abbreviation}</h2>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Time App
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      <Grid>
        <Row>
          <Col md={2} sm={2}>
            <h3>Select a city</h3>
            <Nav
              bsStyle="pills"
              stacked
              activeKey={activePlace}
              onSelect={index => {
                this.setState({ activePlace: index });
              }}
            >
            {PLACES.map((place, index) => (
              <NavItem key={index} eventKey={index}>{place.name}</NavItem>
            ))}
            </Nav>
          </Col>
          <Col md={8} sm={8}>
            <LocalTime key={activePlace} location={PLACES[activePlace].location} />
          </Col>
        </Row>
      </Grid>
      </div>
    );
  }
}

export default App;
