/* components/MyOrdersPage/index.js */
import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
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

  const [data, setData] = useState({});
  //   const [query, setQuery] = useState('redux');
  //   const [url, setUrl] = useState(
  //     'https://hn.algolia.com/api/v1/search?query=redux',
  //   );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      //   const result = await axios(url);
      //   try {
      //     const response = await fetch("http://localhost:1337/auth/local", {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({ identifier: email, password: password })
      //     });

      //   setData(result.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <>
      {" "}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          Hello
          {/* {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))} */}
        </ul>
      )}
    </>
  );
}
export default MyOrdersPage;
