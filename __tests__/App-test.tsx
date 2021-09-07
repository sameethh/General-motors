/**
 * @format
 */

jest.useFakeTimers();

import 'react-native';
import React from 'react';
import fetchMock from 'fetch-mock';
import App from '../App';
import renderer from 'react-test-renderer';

const userName = 'sameethh';
const repo = 'General-motors';

it('Should get Api Data', () => {
  fetchMock.get(`https://api.github.com/repos/${userName}/${repo}/commits`, [
    {
      sha: '09adf81cbaaa76da20281d9d381ef0ef61e35f2e',
      commit: {
        author: {
          name: 'Samith',
          email: 'samith.gadila@gmail.com',
          date: '2021-09-06T22:14:49Z',
        },
        message: 'Beautify and functionality corrections',
      },
    },
  ]);
  // eslint-disable-next-line no-shadow
  const ender = renderer.create(<App />);
  expect(ender).toBeTruthy();
});
