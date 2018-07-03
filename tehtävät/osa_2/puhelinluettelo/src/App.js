import React from 'react';
import personService from './services/persons.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      search: ''
    }
  }

  componentDidMount(){
    personService.getAll()
      .then(result => {
        this.setState({
          persons: result
        })
      })
  }

  updateName = (event) => {
    this.setState({ newName: event.target.value })
  }

  updateNumber = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  updateSearch = (event) => {
    this.setState({ search: event.target.value })
  }

  addPerson = (event) => {
    event.preventDefault()
    const nameToAdd = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if(this.state.persons.some(person => person.name === this.state.newName)){
      alert('Name already exists!')
      return
    }

    personService.create(nameToAdd)
      .then(result => {
        console.log(result)
        this.setState({
          persons: this.state.persons.concat(result)
        })
      })
  }

  // TODO: Jatka tästä tehtävää 2.16
  removePerson = (id) => {
    return (() => {
      if(window.confirm("Do you really want to delete this person?")){
        personService.remove(id)
          .then(result => {
            console.log(result)
            console.log('Person with id ' + id + ' was removed from the server')
            this.setState({
              persons: this.state.persons.filter(person => person.id !== id)
            })
          })
      }
    })
  }

  render() {



    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <AddPerson
          addPerson={this.addPerson}
          newName={this.state.newName}
          updateName={this.updateName}
          newNumber={this.state.newNumber}
          updateNumber={this.updateNumber}
        />
        <Search search={this.state.search} updateSearch={this.updateSearch}/>
        <Names
          persons={this.state.persons}
          search={this.state.search}
          removePerson={this.removePerson}
        />
      </div>
    )
  }
}

const AddPerson = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        nimi: <input value={props.newName} onChange={props.updateName}/> <br/>
        numero: <input value={props.newNumber} onChange={props.updateNumber}/>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const Search = ({search, updateSearch}) => (
  <div>
    <h2>Haku:</h2>
    Hae nimellä: <input value={search} onChange={updateSearch}/>
  </div>
)

const Names = ({persons, search, removePerson}) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  const data = filtered.map(person => {
    return (
      <li key={person.name}>
        {person.name}: {person.number}
        <button onClick={removePerson(person.id)}>Poista</button>
      </li>
    )
  })

  return (
    <div>
      <h2>Numerot</h2>
      <ul>
        {data}
      </ul>
    </div>
  )
}

export default App
