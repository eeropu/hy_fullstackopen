import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: [],
      mostVotes: 0
    }

    for (var i = 0; i < anecdotes.length; i++) {
      this.state.points[i] = 0
    }
  }

  randomAnecdote = () => {
    this.setState({
      selected: Math.floor(Math.random() * 6)
    })
  }

  vote = () => {
    const kopio = [...this.state.points]
    kopio[this.state.selected] = kopio[this.state.selected] + 1
    this.setState({
      points: kopio
    })
    let max = 0
    let mv = 0 //mv stands for mostVotes
    for (var i = 0; i < kopio.length; i++) {
      if(kopio[i] > max){
        max = kopio[i]
        mv = i
      }
    }
    this.setState({
      mostVotes: mv
    })
  }

  render() {
    return (
      <div>
        {anecdotes[this.state.selected]} (points: {this.state.points[this.state.selected]})<br/>
        <button onClick={this.randomAnecdote}>Show new</button>
        <button onClick={this.vote}>Vote</button>
        <h4>Most voted anecdote:</h4>
        {anecdotes[this.state.mostVotes]}<br/>
        it has {this.state.points[this.state.mostVotes]} votes
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
