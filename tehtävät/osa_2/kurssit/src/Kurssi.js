import React from 'react';

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

export default Kurssi
