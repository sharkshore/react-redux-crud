import React from 'react';

import BreadHead  from'../components/common/BreadHead.jsx'
import GnhcMain from '../components/gnhc/Main.jsx'


/**
 *  今日观察页面
 */
export default class Gnhc extends React.Component {

    render() {
        return (
            <div>
                <BreadHead firstLevel="功能缓存策略管理" firstUrl="gnhc" disabled={true}/>
                <GnhcMain/>
                {this.props.children}
            </div>
        );
    }
}




