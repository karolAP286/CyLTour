import {
    Container,
    Row,
    Col,
    Stack,
    Image,
    Nav,
    NavLink,
} from "react-bootstrap";
import reactLogo from '../img/logo.svg'
import "./FooterComponent.css"
function FooterComponent() {
    return (
        <footer className="fixed-bottom mycss">
            <Container fluid>
                <Row className="mycss text-white p-4">
                    <Col className="mx-5">
                        <Stack>
                            <Image src={reactLogo} alt="company logo" rounded width={80} height={80}/>
                        </Stack>
                        <h2>Comapany name</h2>
                        <p>Company tagline here</p>
                    </Col>
                    <Col>
                        <Nav className="flex-column fs-5">
                            <NavLink href="#" className="text-white">Home</NavLink>
                            <NavLink href="#" className="text-white">About</NavLink>
                            <NavLink href="#" className="text-white">Products</NavLink>
                        </Nav>
                    </Col>
                    <Col>
                        <h4>Contact us!</h4>
                        <p>email@kfhaklf.com</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default FooterComponent;
