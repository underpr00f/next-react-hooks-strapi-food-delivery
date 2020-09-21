/* /pages/restaurants.js */
import React from 'react'
import Link from "next/link";
import { useContext } from "react";
import AppContext from "../../../context/AppContext";
import {errorSlugChecker} from "../../../utils/errorChecker";
import { API_URL } from '../../../utils/constants'

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

export default function Restaurants (props) {
    const appContext = useContext(AppContext);
    if (props.error&&props.error.errorCode) return props.error.errorMessage||"Error Loading Dishes";
    if (props.data) {
      return (
        <>
          <h1>{props.data.name}</h1>
          <Row>
            {props.data.dishes.map((res) => (
              <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
                <Card style={{ margin: "0 10px" }}>
                  <CardImg
                    top={true}
                    style={{ height: 250 }}
                    src={
                      process.env.NODE_ENV === "production"
                        ? res.image.url
                        : `${res.image.url}`
                    }
                  />
                  <CardBody>
                    <CardTitle>
                      <Link
                        as={`/restaurants/${props.data.division.slug}/${props.data.slug}/${res.slug}`}
                        href={`/restaurants/[division]/[slug]/[slugdish]`}
                      >
                        <a>{res.name}</a>
                      </Link>
                    </CardTitle>
                  <CardText>${res.price}</CardText>
                  </CardBody>
                  <div className="card-footer">
                    <Button
                      outline
                      color="primary"
                      onClick={() => appContext.addItem(res)}
                    >
                      + Add To Cart
                    </Button>
  
                    <style jsx>
                      {`
                        a {
                          color: white;
                        }
                        a:link {
                          text-decoration: none;
                          color: white;
                        }
                        .container-fluid {
                          margin-bottom: 30px;
                        }
                        .btn-outline-primary {
                          color: #007bff !important;
                        }
                        a:hover {
                          color: white !important;
                        }
                        .card-text {
                          display: -webkit-box;
                          -webkit-line-clamp: 3;
                          -webkit-box-orient: vertical;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        }
                      `}
                    </style>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      );
    }
    return <h1>Add Dishes</h1>;
}

export async function getServerSideProps(context) {
  const { slug, division } = context.query
  const res = await fetch(`${API_URL}/restaurants?slug=${slug}`)  
  const data = await errorSlugChecker(res, division)

  return {
    props: data
  }
}