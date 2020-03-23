import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

import {film} from '../../mocks/test-mocks.js';

const TabsWrapped = withActiveItem(Tabs);

it(`VideoPlayer is rendered correctly`, () => {
  const tree = renderer
    .create(
        <TabsWrapped
          film={film}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

