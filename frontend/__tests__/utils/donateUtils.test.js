import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { getLastDonate } from '../../utils/donateUtils';

//WORKING EXAMPLE AXIOS TO DATA CHECK
// export const fetchData = async () => {
//   const url = `https://reqres.in/api/users/2`;
//   const response = await axios.get(url).then((res) => {
//     return res.data.data;
//   });
// };

// test('async get data and check', async () => {
//   const fakeData = {
//     avatar:
//       'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg',
//     email: 'janet.weaver@reqres.in',
//     first_name: 'Janet',
//     id: 2,
//     last_name: 'Weaver'
//   };
//   const data = await fetchData();
//   expect(data).toStrictEqual(fakeData);
// });

test('get last donate check data keys', async () => {
  const testingToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODRjYWQzMTQwNjA4NDRjZjgxZmJjYSIsImlhdCI6MTYwNDIzOTQ1OCwiZXhwIjoxNjA2ODMxNDU4fQ.e95sf4tYNH5Hy7W9DSWgudWB1cDGYYp2Gx-Q6O47X9Y';

  const fakeData = {
    confirmed: false,
    _id: '5f9ed7fff5abeb8cd568814a',
    message: '33242333',
    anothermessage: '33242333',
    createdAt: '2020-11-01T15:45:03.565Z',
    updatedAt: '2020-11-03T01:20:30.756Z',
    __v: 0,
    id: 'ww'
  };
  const data = await getLastDonate(testingToken);

  expect(Object.keys(data).sort()).toEqual(Object.keys(fakeData).sort());
});
