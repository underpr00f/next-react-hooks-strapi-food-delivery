import React from 'react'

/* /pages/restaurants.js */
import { useContext } from "react";
import { useRouter } from "next/router";
import CartPage from "../../components/cart/CartPage";
import AppContext from "../../context/AppContext";
import {errorChecker} from "../../utils/errorChecker";

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
    if (props.error&&props.error.errorCode) return "Error Loading Dishes";
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
                    <CardTitle>{res.name} - ${res.price}</CardTitle>
                  <CardText>{res.description}</CardText>
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
                      `}
                    </style>
                  </div>
                </Card>
              </Col>
            ))}
            <Col xs="3" style={{ padding: 0 }}>
              <div>
                <CartPage />
              </div>
            </Col>
          </Row>
        </>
      );
    }
    return <h1>Add Dishes</h1>;
}
// Restaurants.getInitialProps = async (context) => {
//     const response = await fetch(`http://localhost:1337/restaurants/${context.query.id}`)    
//     const data = await errorChecker(response)
//     return data
//   }

export async function getServerSideProps(context) {
  const response = await fetch(`http://localhost:1337/restaurants/${context.query.id}`)    
  const data = await errorChecker(response)
  console.log(data.data, data.error)
  return {
    props: data
  }
}