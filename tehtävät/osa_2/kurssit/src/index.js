import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
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
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

const Kurssi = (props) => (
  <div>
    <Otsikko nimi={props.kurssi.nimi} />
    <Sisalto osat={props.kurssi.osat} />
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

ReactDOM.render(<App />, document.getElementById('root'));
