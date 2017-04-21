import React from 'react';

import BreadHead from '../components/common/BreadHead.jsx'

/**
 * 商户返回时长统计页面
 */
export default class Shfhsc extends React.Component {

    render() {
        return (
            <div>
                <BreadHead firstLevel="日志报表" firstUrl={"one"} secondUrl={"two"} secondLevel={"商户返回时长报表"}/>
                {this.props.children}
            </div>
        );
    }
}



