import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  lisaaPalaute = (palaute) => {
    if(palaute === 'hyvä') {
      return () => {
        this.setState({
          hyva: this.state.hyva + 1
        })
      }
    } else if (palaute === 'neutraali'){
      return () => {
        this.setState({
          neutraali: this.state.neutraali + 1
        })
      }
    } else if (palaute === 'huono'){
      return () => {
        this.setState({
          huono: this.state.huono + 1
        })
      }
    }
  }

  render(){
    return (
      <div>
        <Palautelomake handleClick={this.lisaaPalaute}/>
        <Statistiikka stats={this.state}/>
      </div>
    )
  }
}

const Palautelomake = ({handleClick}) => (
  <div>
    <h2>anna palautetta</h2>
    <button onClick={handleClick('hyvä')}>hyvä</button>
    <button onClick={handleClick('neutraali')}>neutraali</button>
    <button onClick={handleClick('huono')}>huono</button>
  </div>
)

const Statistiikka = (props) => {
  const {hyva, neutraali, huono} = props.stats
  return (
    <div>
      <h2>statistiikka</h2>
      <p>hyvä {hyva}</p>
      <p>neutraali {neutraali}</p>
      <p>huono {huono}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
