/* eslint-disable operator-linebreak */
export const STATIC_URL = "/";

export const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

export const linksArray = [
  { linkName: "Главная", linkValue: "/" },
  { linkName: "Моя Корзина", linkValue: "/cart" },
  { linkName: "Мои Заказы", linkValue: "/my-orders" },
  { linkName: "Batman", linkValue: "/items" }
];

export const sliderArray = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1585032083826-2f87ca6a0472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    text: "Porsche",
    description: "Yellow Porsche"
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1524607653778-93c5fe9d8dd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    text: "Chevrolet",
    description: "Yellow Chevy"
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1560179699-9752420a73cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    text: "BMW",
    description: "White BMW"
  }
];

export const testimonialsArray = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1585032083826-2f87ca6a0472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160&q=80",
    text: "Jordan Bargeman",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi massa, faucibus ut rutrum ac, cursus ac sem. Nam sed lorem fringilla, pretium elit quis, lacinia felis. Proin molestie elit nec purus efficitur sollicitudin. "
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1524607653778-93c5fe9d8dd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160&q=80",
    text: "John Smith",
    description:
      "Maecenas fermentum nunc tortor, a porttitor nibh aliquam quis. Nunc ac auctor ipsum, sit amet rutrum metus. Phasellus pellentesque nibh vitae commodo pharetra. Fusce ut consequat dolor. Aenean tincidunt elit tortor, at ultricies eros imperdiet in. Ut consectetur tortor quis ex tincidunt condimentum eget ac quam."
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1560179699-9752420a73cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160&q=80",
    text: "Jane Chu",
    description:
      "Nullam vitae nisi nisl. Aenean mollis magna sapien, in mattis odio rhoncus sit amet. In hac habitasse platea dictumst. Pellentesque luctus iaculis mi, nec faucibus dolor dignissim eget. Etiam a mattis magna. "
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1585032083826-2f87ca6a0472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160&q=80",
    text: "Henry Fong",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada hendrerit dignissim. Vivamus ac augue venenatis, feugiat metus eget, varius nisl. Praesent rutrum ut nulla at suscipit. "
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1524607653778-93c5fe9d8dd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    text: "Jason Stathem",
    description:
      "Phasellus iaculis orci at elit ornare, non maximus nulla luctus. Phasellus sed nisl tincidunt, pellentesque dui ac, sagittis felis. Quisque ac est in felis dictum aliquet. Praesent nec felis lectus. Mauris vel sem sit amet felis tristique luctus."
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1560179699-9752420a73cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=160&q=80",
    text: "Matt Bean",
    description:
      "Vivamus a volutpat ante. Nam vel lacinia massa. Suspendisse potenti. Nullam cursus, sem facilisis porta fringilla, diam nibh lobortis augue, in congue ipsum nibh et nibh. Proin accumsan tristique vestibulum. "
  }
];
