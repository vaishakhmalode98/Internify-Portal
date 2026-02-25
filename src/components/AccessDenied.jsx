import { Container } from "react-bootstrap";
// import accessDeniedImage from '../../public/access.jpg';
import accessDeniedGif from '../../public/stop-penguin.gif';

export function AccessDenied() {
    
    return (
        <Container className="mt-3 text-center">
            <img src={accessDeniedGif} height={400}/>
        </Container>
    )
}