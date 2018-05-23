import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={osat} />
      <Yhteensa osat={osat} />
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
      <Osa name={props.osat[0].nimi} assignments={props.osat[0].tehtavia} />
      <Osa name={props.osat[1].nimi} assignments={props.osat[1].tehtavia} />
      <Osa name={props.osat[2].nimi} assignments={props.osat[2].tehtavia} />
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
  const sum = props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia
  return (
    <div>
      <p>yhteensä {sum} tehtävää</p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
