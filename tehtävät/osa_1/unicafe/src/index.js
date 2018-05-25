import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
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

  keskiarvo = () => {
    let sum = this.state.hyva - this.state.huono
    let count = this.state.hyva + this.state.neutraali + this.state.huono
    return Math.round(sum/count * 10) / 10
  }

  positiivisia = () => {
    let result = this.state.hyva / (this.state.hyva + this.state.neutraali + this.state.huono)
    return Math.round(result * 1000) / 10
  }

  render(){
    return (
      <div>
        <Palautelomake handleClick={this.lisaaPalaute}/>
        <Statistiikka stats={this.state} average={this.keskiarvo()} positive={this.positiivisia()}/>
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
      <StatRivi nimi='hyva' arvo={hyva}/>
      <StatRivi nimi='neutraali' arvo={neutraali}/>
      <StatRivi nimi='huono' arvo={huono}/>
      <StatRivi nimi='keskiarvo' arvo={props.average}/>
      <StatRivi nimi='positiivisia' arvo={props.positive}/>
    </div>
  )
}

const StatRivi = (props) => (<p>{props.nimi} {props.arvo}</p>)

ReactDOM.render(<App />, document.getElementById('root'));
