import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import App from "../App.jsx";


//时长报表
import Scbb from "../views/Scbb.jsx";

//异常报表
import Ycbb from "../views/Ycbb.jsx";

//缓存策略管理
import Hcclgl from "../views/Hcclgl.jsx"

//功能缓存策略管理
import Gnhc from "../views/Gnhc.jsx"
import GnhcDialog from '../components/gnhc/GnhcDialog.jsx'


import Dialog from '../components/hcclgl/HcclDialog.jsx'





export default class RootRouter extends React.Component {

    render() {
        return (
            <Router {...this.props} >
                {/*  此处设置成和项目文件夹一个名字,保证发布到服务器时URL路径一致  */}
                <Route path="/credit-omsweb" component={App}>
                    <IndexRoute component={Hcclgl}/>

                    {/*缓存配置管理*/}
                    <Route path="hcpzgl" >

                        {/*  缓存策略管理  */}
                        <Route path="hcclgl" component={Hcclgl}>
                           <Route path="dialog" components={Dialog}/>
                        </Route>

                        {/*  功能缓存策略管理  */}
                        <Route path="gnhc" component={Gnhc}>
                            <Route path="dialog" components={GnhcDialog}/>
                        </Route>
                        {/*<Route path="gnhcgl" component={YcbbIdCard}></Route>*/}
                    </Route>

                    {/*  日志报表  */}
                    <Route path="rzbb" >
                        {/*  商户返回时长报表  */}
                        <Route path="scbb" component={Scbb}>
                        </Route>
                        {/*  异常报表  */}
                        <Route path="ycbb" component={Ycbb}>
                        </Route>
                    </Route>
                    {/*  系统设置  */}
                    <Route path="xtsz" component={Ycbb}>
                        {/*<Route path="yhgl" component={YcbbSfzcx}/>*/}
                    </Route>
                </Route>
            </Router>
        );
    }
}



