import React from 'react'
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

import AppContext from "../../../../context/AppContext";
import {errorSlugRestChecker} from "../../../../utils/errorChecker";
import { API_URL } from '../../../../utils/constants'


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

export default function Dishes (props) {
  const appContext = useContext(AppContext);
  const router = useRouter()
  const url = router.asPath;
  let toRestLink = ""
  
  toRestLink = url.substring(0, url.lastIndexOf('/'));

  if (props.error&&props.error.errorCode) return props.error.errorMessage||"Error Loading Dishes";
  if (props.data) {
    return (
      <>
        <h1>{props.data.name} from <Link href={toRestLink}><a>{props.data.restaurant.name}</a></Link></h1>
        <Row>
          <Col xs="12" sm="6" style={{ margin: "10px 0" }}>
            <img 
              style={{ 
                width: '100%', 
                height: 250, 
                objectFit: 'cover',
                objectPosition: '50% 50%'
              }}
              src={
                process.env.NODE_ENV === "production"
                  ? props.data.image.url
                  : `${props.data.image.url}`
              }
            />
          </Col>
          <Col xs="12" sm="6" style={{ margin: "10px 0" }}>
            <Card style={{ margin: "0 10px" }}>
              <CardBody>
                <CardTitle>{props.data.name}</CardTitle>
                <CardText>{props.data.description}</CardText>
              </CardBody>
              <div className="card-footer">
                  <span>${props.data.price}</span>
                  <Button
                      outline
                      color="primary"
                      onClick={() => appContext.addItem(props.data)}
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
                    .card-footer {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
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
        </Row>
      </>
    );
  }
  return <h1>Add Dishes</h1>;
}

export async function getServerSideProps(context) {
  const { slug, slugdish } = context.query
  const { url } = context.req

  const res = await fetch(`${API_URL}/dishes?slug=${slugdish}`)  
  const data = await errorSlugRestChecker(res, slug)

  return {
    props: data
  }
}