/* /pages/index.js */
import React from "react";

import { API_URL } from "../utils/constants";

import SectionRestaurantList from "../components/sections/SectionRestaurnantList";
import SectionPricing from "../components/sections/SectionPricing";

function Home(props) {
  return (
    <>
      <SectionRestaurantList shows={props.shows} />
      <SectionPricing />
    </>
  );
}
export default Home;

Home.getInitialProps = async (context) => {
  const res = await fetch(`${API_URL}/restaurants/`);
  const data = await res.json();
  const shows = data.map((entry) => entry);
  return { shows };
};
