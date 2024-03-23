import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  function submitForm(e) {
    e.preventDefault();
    const trimmedSearchField = searchField.trim();
    if (trimmedSearchField !== "") {
      const queryString = `title=true&q=${encodeURIComponent(trimmedSearchField)}`;
      setSearchHistory(currentHistory => [...currentHistory, queryString]);
      router.push(`/artwork?${queryString}`);
      setSearchField("");
      setIsExpanded(false);
    }
  }

  function toggleNavbar() {
    setIsExpanded(prev => !prev);
  }

  function closeNavbar() {
    setIsExpanded(false);
  }

  function navigateToFavourites() {
    router.push('/favourites');
    setIsExpanded(false);
  }

  function navigateToHistory() {
    router.push('/history');
    setIsExpanded(false);
  }

  const isActive = (pathname) => router.pathname === pathname;

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
        <Container>
          <Navbar.Brand as="span">Ahmad Mashal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link active={isActive('/')} href="/" onClick={closeNavbar}>Home</Nav.Link>
              <Nav.Link active={isActive('/search')} href="/search" onClick={closeNavbar}>Advanced Search</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={submitForm}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button variant="success" type="submit">Search</Button>
            </Form>
            <Nav>
              <NavDropdown title="Ahmad" id="basic-nav-dropdown" alignRight>
                <NavDropdown.Item onClick={navigateToFavourites}>Favourites</NavDropdown.Item>
                <NavDropdown.Item onClick={navigateToHistory}>Search History</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ paddingTop: '4rem' }}>
        {/* Your main page content goes here */}
      </Container>
    </>
  );
}
