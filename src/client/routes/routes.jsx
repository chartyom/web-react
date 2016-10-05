import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

import DefaultTheme from '../layouts/theme/DefaultTheme';

import SearchDefaultArticle from '../layouts/articles/search/SearchDefaultArticle';
import ErrorDefaultArticle from '../layouts/articles/error/ErrorDefaultArticle'

import ExampleBasicForm from '../layouts/forms/ExampleBasicForm'

const routes = (
    <Router history={browserHistory}>
        <Route component={DefaultTheme}>
            <Route path="/users" component={ExampleBasicForm} />
            <Route component={SearchDefaultArticle}>
                <Route path="/" component={ExampleBasicForm} />
            </Route>
            <Route path="*" component={ErrorDefaultArticle} />
        </Route>
    </Router>
);

export default routes;