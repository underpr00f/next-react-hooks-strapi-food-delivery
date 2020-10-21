/* /lib/apollo.js */

// import { HttpLink } from "apollo-link-http";
// import { withData } from "next-apollo";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// const config = {
//   link: new HttpLink({
//     uri: `${API_URL}/graphql`, // Server URL (must be absolute)
//   }),
// };
// export default withData(config);

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import withApollo from "next-with-apollo";
import { createHttpLink } from "apollo-link-http";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const link = createHttpLink({
  axios,
  uri: API_URL
});

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      link: link,
      cache: new InMemoryCache().restore(initialState || {})
    })
);
