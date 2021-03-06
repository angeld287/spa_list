import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTable from './index';
import IPost from '../../Interfaces/IPosts'
import { EditOutlined } from '@ant-design/icons';

let _headers: string[] = []
let _items: IPost[];

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      addListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
  });

  _headers = ['id', 'userId', 'title', 'body'];
  const post: IPost = {
    id: 1,
    userId: 1,
    body: 'This is the body of the post',
    title: 'this is the title of the post',
    actions: [
      { id: '1', color: 'blue', onClick: () => { console.log(1) }, children: "Remove", loading: false, _key: '2' },
    ],
  }
  _items = [post]
});

test('It must render the table component', () => {

  render(<CustomTable headers={_headers} itemsLoading={false} items={_items} />);
  const text = screen.getByText(/My Table/);
  expect(text).toBeInTheDocument();
});
