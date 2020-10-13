/* components/MyOrdersPage/index.js */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import AppContext from "../../context/AppContext";
import { userOrdersFetch } from "../../utils/userUtils";
import { LoaderContent } from "../Loaders/LoaderContent";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { ButtonLink } from "../../MUI/Molecules/ButtonLink";
// const QUERY = gql`
//   {
//     restaurants {
//       id
//       name
//       description
//       image {
//         url
//       }
//     }
//   }
// `;
const useStyles = makeStyles({
  gridCont: {
    marginTop: "1em"
  },
  cardText: {
    display: "-webkit-box",
    WebkitLineClamp: "4",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  cardTitle: {
    color: "#000"
  }
});

function MyOrdersPage(props) {
  const appContext = useContext(AppContext);
  const classes = useStyles();

  const [data, setData] = useState([]);
  //   const [query, setQuery] = useState('redux');
  //   const [url, setUrl] = useState(
  //     'https://hn.algolia.com/api/v1/search?query=redux',
  //   );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //check token
    const token = Cookie.get("token");
    if (token) {
      //get user and cart from db

      const fetchData = async () => {
        setIsLoading(true);
        const orders = await userOrdersFetch();
        //   const result = await axios(url);
        //   try {
        //     const response = await fetch("http://localhost:1337/auth/local", {
        //       method: "POST",
        //       headers: { "Content-Type": "application/json" },
        //       body: JSON.stringify({ identifier: email, password: password })
        //     });

        setData(orders);
        setIsLoading(false);
      };
      fetchData();
    }
  }, []);
  console.log(data);
  //date format from isostring
  const parseISOString = (s) => {
    var b = s.split(/\D+/);
    console.log(s, b);
    return `${b[0]}-${b[1]}-${b[2]},  ${b[3]}:${b[4]}:${b[5]}`;
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <LoaderContent />
      ) : (
        <ul>
          {data.length ? (
            data.map((item, index) => {
              if (item.payed) {
                return (
                  <li key={item.id}>
                    {item.last_dishes.map((dish, i) => {
                      // console.log(item.id + dish.id);
                      return (
                        <div key={item.id + dish.id}>
                          <span>
                            {dish.name} x {dish.quantity} = {dish.price}
                          </span>
                        </div>
                      );
                    })}{" "}
                    <b>Total: {item.amount}</b>
                    <br />
                    <small>DATE: {parseISOString(item.updatedAt)}</small>
                  </li>
                );
              } else if (index > 0) {
                return null;
              }

              return <h3>Have not orders yet</h3>;
            })
          ) : (
            <h3>Have not orders yet</h3>
          )}
        </ul>
      )}
    </>
  );
}
export default MyOrdersPage;
