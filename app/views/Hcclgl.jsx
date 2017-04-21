import React from 'react';

import BreadHead  from'../components/common/BreadHead.jsx'
import HcclglMain from '../components/hcclgl/Main.jsx'


/**
 *  今日观察页面
 */
export default class Hcclgl extends React.Component {

    render() {
        return (
            <div>
                <BreadHead firstLevel="缓存策略管理" firstUrl="hcclgl" disabled={true}/>
                <HcclglMain/>
                {this.props.children}
            </div>
        );
    }
}




