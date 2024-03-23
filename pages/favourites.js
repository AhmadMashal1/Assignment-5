// pages/favourites.js

import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (favouritesList.length === 0) {
    return (
      <Container className="mt-5">
        <Card>
          <Card.Body>
            <Card.Text>Nothing Here. Try adding some new artwork to the list.</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row xs={1} md={2} lg={4} className="g-4">
        {favouritesList.map((objectID) => (
          <Col key={objectID}>
            <ArtworkCard objectID={objectID} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
