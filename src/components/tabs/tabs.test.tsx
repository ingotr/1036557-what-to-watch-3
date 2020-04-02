import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Tabs from './tabs';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

import {film} from '../../mocks/test-mocks';

const TabsWrapped = withActiveItem(Tabs);

it(`VideoPlayer is rendered correctly`, () => {
  const tree = renderer
    .create(
        <TabsWrapped
          movie={film}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

