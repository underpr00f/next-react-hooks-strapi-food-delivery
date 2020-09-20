/* /pages/index.js */
import React, { useState } from "react";

import { Col, Input, InputGroup, InputGroupAddon, Row } from "reactstrap";
import RestaurantList from "../components/RestaurantList";
import { API_URL } from '../utils/constants'

function Home(props) {
  const [query, updateQuery] = useState("");
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupAddon addonType="append"> Search </InputGroupAddon>
              <Input
                onChange={(e) =>
                  updateQuery(e.target.value.toLocaleLowerCase())
                }
                value={query}
              />
            </InputGroup>
          </div>
          <RestaurantList search={query} data={props.shows}/>
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  );
}
export default Home;

Home.getInitialProps = async (context) => {
  const res = await fetch(`${API_URL}/restaurants/`)    
  const data = await res.json()
  const shows = data.map((entry) => entry)
  return { shows }
}