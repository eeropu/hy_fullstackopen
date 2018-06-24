import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  updateName = (event) => {
    this.setState({ newName: event.target.value })
  }

  addName = (event) => {
    event.preventDefault()
    const nameToAdd = {
      name: this.state.newName
    }

    const persons = this.state.persons.concat(nameToAdd)

    this.setState({
      persons,
      newName: ''
    })
  }

  render() {

    const names = this.state.persons.map(person => <li key={person.name}>{person.name}</li>)

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.updateName}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {names}
        </ul>
      </div>
    )
  }
}

export default App
