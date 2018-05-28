import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <ul>
      {kurssit.map((kurssi) => <Kurssi kurssi={kurssi} key={kurssi.id}/>)}
    </ul>
  )
}

const Kurssi = (props) => (
  <div>
    <Otsikko nimi={props.kurssi.nimi} />
    <Sisalto osat={props.kurssi.osat} />
    <Tehtavia osat={props.kurssi.osat} />
  </div>
)

const Otsikko = (props) => (
  <h2>{props.nimi}</h2>
)

const Sisalto = ({osat}) => (
  <ul>
    {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
  </ul>
)

const Osa = ({osa}) => (<li>{osa.nimi} {osa.tehtavia}</li>)

const Tehtavia = ({osat}) => {
  const summa = osat.reduce((sum, osa) => sum + osa.tehtavia, 0)
  return (
    <p>
      Yhteensä {summa} tehtävää
    </p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
