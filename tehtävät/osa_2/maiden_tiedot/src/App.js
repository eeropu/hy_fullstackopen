import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      showing: [],
    }
  }

  componentDidMount(){
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({
          countries: response.data,
          showing: response.data
        })
      })
  }

  handleSearchChange = (event) => {
    const update = this.state.countries.filter(
      country => country.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    this.setState({
      showing: update
    })
  }

  updateResult = () => {
    const length = this.state.showing.length

    if (length === 0) {
      return <h4>No results found</h4>
    } else if (length === 1) {
      const country = this.state.showing[0]
      return (
        <div>
          <h1>{country.name}; {country.nativeName}</h1>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <img src={country.flag} alt="country's flag"/>
        </div>
      )
    } else if (length <= 10) {
      return (
        <ul>
          {this.state.showing.map(
            country => {
              return (
                <li key={country.name}
                onClick={() => this.nameClicked(country)}>
                  {country.name}
                </li>
              )
            }
          )}
        </ul>
      )
    } else {
      return <h4>Too many results, please specify!</h4>
    }
  }

  nameClicked = (country) => {
    this.setState({
      showing: [country]
    })
  }

  render() {
    return (
      <div>
        <Search handleSearchChange={this.handleSearchChange} />
        <Results updateResult={this.updateResult} />
      </div>
    );
  }
}

const Search = ({handleSearchChange}) => {
  return (
    <div>
      <h2>Search by country name: </h2>
      <input id='searchfield' type='text' onChange={handleSearchChange} />
    </div>
  )
}

const Results = ({updateResult}) => {
  const result = updateResult()

  return (
    <div>
      {result}
    </div>
  )
}

export default App;
