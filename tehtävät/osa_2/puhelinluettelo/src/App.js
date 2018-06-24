import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: '',
      newNumber: '',
      search: ''
    }
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

    if(this.state.persons.some(this.containsName)){
      alert('Name already exists!')
      return
    }

    const persons = this.state.persons.concat(nameToAdd)

    this.setState({
      persons,
      newName: '',
      newNumber: ''
    })
  }

  containsName = (person) => person.name === this.state.newName

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
        <Names persons={this.state.persons} search={this.state.search} />
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

const Names = ({persons, search}) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  const data = filtered.map(person => <li key={person.name}>{person.name}: {person.number}</li>)

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
