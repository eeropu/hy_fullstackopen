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

  search = (event) => {
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

    const filtered = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.search.toLowerCase()))
    const persons = filtered.map(person => <li key={person.name}>{person.name}: {person.number}</li>)

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.updateName}/> <br/>
            numero: <input value={this.state.newNumber} onChange={this.updateNumber}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Haku:</h2>
        Hae nimellä: <input value={this.state.search} onChange={this.search}/>
        <h2>Numerot</h2>
        <ul>
          {persons}
        </ul>
      </div>
    )
  }
}

export default App
