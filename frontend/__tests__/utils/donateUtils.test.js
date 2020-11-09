import axios from 'axios';
import { manageDonate, getLastDonate } from '../../utils/donateUtils';

jest.mock('axios');
let fakeData;
let response;
let postValues;
let testingToken;

beforeEach(() => {
  fakeData = {
    message: '33242333',
    anothermessage: '33242333'
  };
  response = { data: { fakeData } };
  testingToken = 'testingtokendawdjujha';
});

describe('donate util manageDonate - post request', () => {
  test('success post last donate mock', async () => {
    postValues = { message: 'hello' };
    response.statusText = 'OK';
    axios.post.mockReturnValue(response);
    return manageDonate(testingToken, postValues).then((data) => {
      expect(data.fakeData).toEqual(fakeData);
    });
  });
  test('error post last donate mock (without response.statusText)', async () => {
    axios.post.mockReturnValue(response);
    return manageDonate(testingToken, postValues).then((data) => {
      expect(data).toBeNull();
    });
  });
  test('without postValues', async () => {
    axios.post.mockReturnValue(response);
    return manageDonate(testingToken).then((data) => {
      expect(data).toBeNull();
    });
  });
  test('without token', async () => {
    axios.post.mockReturnValue(response);
    return manageDonate(undefined, postValues).then((data) => {
      expect(data).toBeNull();
    });
  });
});

describe('donate util getLastDonate test', () => {
  test('success get last donate mock', async () => {
    response.statusText = 'OK';
    axios.get.mockReturnValue(response);
    return getLastDonate(testingToken).then((data) => {
      expect(data.fakeData).toEqual(fakeData);
    });
  });
  test('error get last donate mock (without response.statusText)', async () => {
    axios.get.mockReturnValue(response);
    return getLastDonate(testingToken).then((data) => {
      expect(data).toBeNull();
    });
  });
  test('without token', async () => {
    axios.post.mockReturnValue(response);
    return getLastDonate().then((data) => {
      expect(data).toBeNull();
    });
  });
});
//WORKING EXAMPLE AXIOS WITH SERVER DATA CHECK (NOT UNIT TEST)
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

// test('get last donate check data keys', async () => {
//   const testingToken =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODRjYWQzMTQwNjA4NDRjZjgxZmJjYSIsImlhdCI6MTYwNDIzOTQ1OCwiZXhwIjoxNjA2ODMxNDU4fQ.e95sf4tYNH5Hy7W9DSWgudWB1cDGYYp2Gx-Q6O47X9Y';

//   const fakeData = {
//     confirmed: false,
//     _id: '5f9ed7fff5abeb8cd568814a',
//     message: '33242333',
//     anothermessage: '33242333',
//     createdAt: '2020-11-01T15:45:03.565Z',
//     updatedAt: '2020-11-03T01:20:30.756Z',
//     __v: 0,
//     id: 'ww'
//   };
//   const data = await getLastDonate(testingToken);

//   expect(Object.keys(data).sort()).toEqual(Object.keys(fakeData).sort());
// });
