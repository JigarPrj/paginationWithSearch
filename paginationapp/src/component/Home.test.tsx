import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import promise from "redux-promise-middleware";
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from "../reducers/reducer"
import Home from './Home';
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
const middleware = [thunk, promise];

const store = createStore(
  combineReducers(),
  composeEnhancers(applyMiddleware(...middleware))
);

test("render home first",()=>{
    render( <Provider store={store}>
        <Home />
        </Provider>)
    const home = screen.getByPlaceholderText('Search title or created at..')    
    expect(home).toBeInTheDocument()
})

test("render home second",()=>{
    render( <Provider store={store}>
        <Home />
        </Provider>)
    const home = screen.getByTestId('container-table')
    expect(home).toBeInTheDocument()
})

test("render home third",()=>{
    render( <Provider store={store}>
        <Home />
        </Provider>)
    const home = screen.getByText('Created_At')  
    expect(home).toBeInTheDocument()
})