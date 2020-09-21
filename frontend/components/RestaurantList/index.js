/* components/RestaurantList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const QUERY = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

function RestaurantList(props) {
  // const { loading, error, data } = useQuery(QUERY);
  // if (error) return "Error loading restaurants";
  // if restaurants are returned from the GraphQL query, run the filter query
  // and set equal to variable restaurantSearch
  // if (loading) return <h1>Fetching</h1>;
  const {data} = props
  if (data && data.length) {
    //searchQuery
    const searchQuery = data.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <>
          <Row><Col xs="12"><h3>Choose restaurant</h3></Col></Row>
          <Row>
            {searchQuery.map((res) => (
              <Col xs="6" md="4" key={res.id}>
                <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                  <CardImg
                    top={true}
                    style={{ height: 250, objectFit: 'cover' }}
                    src={
                      process.env.NODE_ENV === "production"
                        ? res.image[0].url
                        : `${res.image[0].url}`
                    }
                  />
                  <CardBody>
                    <CardTitle>{res.name}</CardTitle>
                    <CardText>{res.description}</CardText>
                  </CardBody>
                  <div className="card-footer">
                    <Link
                      as={`/restaurants/${res.division.slug}/${res.slug}`}
                      href={`/restaurants/[division]/[slug]`}
                    >
                      <a className="btn btn-primary">View</a>
                    </Link>
                  </div>
                </Card>
              </Col>
            ))}

            <style jsx global>
              {`
                a {
                  color: white;
                }
                a:link {
                  text-decoration: none;
                  color: white;
                }
                a:hover {
                  color: white;
                }
                .card-columns {
                  column-count: 3;
                }
                .card-text {
                  display: -webkit-box;
                  -webkit-line-clamp: 4;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                h3 {
                  margin: 0.5rem;
                }
              `}
            </style>
          </Row>
        </>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
}
export default RestaurantList;
