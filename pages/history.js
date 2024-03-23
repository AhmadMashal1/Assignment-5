
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { searchHistoryAtom } from '../store'; // Adjust the path to your store.js file accordingly
import styles from '@/styles/History.module.css';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  let parsedHistory = [];

  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    e.stopPropagation();
    const queryString = searchHistory[index];
    router.push(`/artwork${queryString}`);
  }
  

  function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(current => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  }

  return (
    <>
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              onClick={e => historyClicked(e, index)}
              className={styles.historyListItem}
            >
              {Object.keys(historyItem).map(key => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={e => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}
