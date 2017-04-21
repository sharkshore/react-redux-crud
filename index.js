import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from './app/stores/configureStore.js'
import {syncHistoryWithStore} from 'react-router-redux'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme  from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'whatwg-fetch'

import RootRouter from './app/routes/RootRouter.jsx'

//创建redux的store
const store = configureStore();
//创建react-router-redux的对象
const history = syncHistoryWithStore(browserHistory, store);

//material配套的react-tap-event-plugin插件初始化
injectTapEventPlugin();

ReactDOM.render((
        <Provider store={store}>
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <RootRouter history={history}/>
            </MuiThemeProvider>
        </Provider>
    ), document.getElementById('app')
)

