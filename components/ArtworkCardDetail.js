import { useAtom } from 'jotai';
import { useState } from 'react';
import { favouritesAtom } from '../store'; 
import { Button, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

  

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  useEffect(() => {
    setShowAdded(favouritesList.includes(objectID));
  }, [favouritesList, objectID]); // Add this useEffect hook

  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList(current => current.filter(fav => fav !== objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(current => [...current, objectID]);
      setShowAdded(true);
    }
  };

  if (error) {
    return <Error statusCode={404} />;
  }

  if (data) {
    return (
      <>
        <Card>
          {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
          <Card.Body>
            <Card.Title>{data.title || "N/A"}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {data.objectDate || "N/A"}<br />
              <strong>Classification:</strong> {data.classification || "N/A"}<br />
              <strong>Medium:</strong> {data.medium || "N/A"}<br />
              <strong>Artist:</strong> {data.artistDisplayName || "N/A"} {data.artistWikidata_URL && <>( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a> )</>}<br />
              <strong>Credit Line:</strong> {data.creditLine || "N/A"}<br />
              <strong>Dimensions:</strong> {data.dimensions || "N/A"}
            </Card.Text>
            <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return null;
  }
}
