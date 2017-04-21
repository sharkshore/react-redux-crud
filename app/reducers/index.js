import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as form} from 'redux-form'


//缓存策略管理
import hcclgl_redux from '../components/hcclgl/redux/Redux'

//功能缓存策略管理
import gnhc_redux from '../components/gnhc/redux/Redux'

const rootReducer = combineReducers({
    routing: routerReducer,
    form,

    //缓存策略管理
    hcclgl_redux,

    //功能缓存策略管理
    gnhc_redux

});

export default rootReducer;
