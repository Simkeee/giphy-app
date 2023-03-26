import { useState, useEffect } from 'react';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Styles.css"

function GifSearch() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let url = 'https://api.giphy.com/v1/gifs/trending?';
    const apiKey = 'api_key=TzHZpJsSnw51Pn1g13HnXnoLpYXzgNTZ';
    const limit = 'limit=20';
    const search = searchTerm ? `q=${searchTerm}` : '';
    const offsetStr = `offset=${offset}`;

    url += [apiKey, limit, search, offsetStr].filter(Boolean).join('&');

    fetch(url)
      .then(res => res.json())
      .then(data => setGifs(data.data))
      .catch(error => console.error(error));
  }, [searchTerm, offset]);

  const handleRandomClick = () => {
    setOffset(Math.floor(Math.random() * 100));
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  
    let url = 'https://api.giphy.com/v1/gifs/search?';
    const apiKey = 'api_key=TzHZpJsSnw51Pn1g13HnXnoLpYXzgNTZ';
    const limit = 'limit=20';
    const search = `q=${searchTerm}`;
  
    url += [apiKey, limit, search].join('&');
  
    fetch(url)
      .then(res => res.json())
      .then(data => setGifs(data.data))
      .catch(error => console.error(error));
  
    setOffset(0);
  };
  

  return (
    <div className="d-flex flex-column align-items-center">
      <Form className="mb-4">
        <Row>
          <Col className='searchItems'>
            <Button className='randomButton' variant="secondary" onClick={handleRandomClick}><b>Random</b></Button>
            <FormControl className='inputSearch' type="text" name="searchTerm" placeholder="Search for GIFs" onChange={handleSearchChange} />
          </Col>
        </Row>
      </Form>
      <Row>
        {gifs.map((gif) => (
          <Col xs={6} md={4} lg={3} key={gif.id}>
            <video autoPlay loop muted width="100%" height="auto">
              <source src={gif.images.original.mp4} type="video/mp4" />
            </video>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default GifSearch;

