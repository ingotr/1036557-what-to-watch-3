import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import reducer from './reducer/reducer.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {Operation as UserOperation,
  ActionCreator, AuthorizationStatus} from './reducer/user/user.js';
import createAPI from './api.js';
import thunk from 'redux-thunk';
import withActiveItem from './hocs/with-active-item/with-active-item.jsx';

const AppWrapped = withActiveItem(App);

const onUnauthorized = () => {
  store.dispatch(
      ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadPromoMovie());
store.dispatch(DataOperation.loadMovies());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <AppWrapped />
    </Provider>,
    document.querySelector(`#root`)
);

