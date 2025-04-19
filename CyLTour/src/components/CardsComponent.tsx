import Card from 'react-bootstrap/Card';
import "./CardsComponent.css";
function CardsComponent({ title }: { title: string }) {
    const imagePath = `/img/${title.toLowerCase().replace(/\s/g, '')}.jpg`; 
    return (
      <Card className="bg-dark text-white">
        <Card.Img src={imagePath} alt="Card image" height={200} />
        <Card.ImgOverlay className='cardcss'>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            Turismo en {title}.
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    );
  }

export default CardsComponent