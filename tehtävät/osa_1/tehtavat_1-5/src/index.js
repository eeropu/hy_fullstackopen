import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} tehtavia1={tehtavia1} tehtavia2={tehtavia2} tehtavia3={tehtavia3}/>
      <Yhteensa assignments1={tehtavia1} assignments2={tehtavia2} assignments3={tehtavia3} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  return (
    <div>
      <Osa name={props.osa1} assignments={props.tehtavia1} />
      <Osa name={props.osa2} assignments={props.tehtavia2} />
      <Osa name={props.osa3} assignments={props.tehtavia3} />
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.name} {props.assignments}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>yhteensä {props.assignments1 + props.assignments2 + props.assignments3} tehtävää</p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
