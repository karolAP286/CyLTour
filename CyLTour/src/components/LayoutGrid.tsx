import {Container, Row, Col} from 'react-bootstrap';
import "./LayoutGrid.css"
import CardsComponent from './CardsComponent';

function LayoutGrid() {
  const provinciasCastillaLeon:string[] = ["Ávila", "Burgos", "León", "Palencia", "Salamanca", "Segovia", "Soria", "Valladolid", "Zamora"];

  return (
    <Container className='gridcss' gap-3>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <Row key={rowIndex}>
          {provinciasCastillaLeon.slice(rowIndex * 3, rowIndex * 3 + 3).map((provincia, colIndex) => (
            <Col key={colIndex} className='text-center'> <CardsComponent title={provincia} /></Col>
          ))}
        </Row>
      ))}
    </Container>
  )
}

export default LayoutGrid