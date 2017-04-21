import React from 'react';
import MyEcharts from './Echarts.jsx'


/**
 * 自定义仪表板组件
 * 在MyEcharts基础上再度封装
 * 用户只需给定baseOptionSet和dataOptionSet
 */
export default class Gauge extends React.Component {

    static propTypes = {
        baseOptionSet: React.PropTypes.object.isRequired,//定制的参数项
        dataOptionSet: React.PropTypes.object.isRequired,//需要变化的数据
        containerId: React.PropTypes.string.isRequired,//容器的ID
        width: React.PropTypes.string.isRequired,//容器的宽度
        height: React.PropTypes.string.isRequired,//容器的高度
    };

    render() {
        const {baseOptionSet,dataOptionSet, containerId, width, height}=this.props;
        const {} =baseOptionSet;
        const {DATA_TOTAL}=dataOptionSet;


        const baseOption = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}"
            },
            series: [
                {
                    name:'one',
                    type: 'gauge',
                    detail: {formatter:'{value}'},
                    data: [],
                }
            ]
        };

        const dataOption={
            series: [
                {
                    name: 'one',
                    data: DATA_TOTAL
                }
            ]

        }

        return (
            <MyEcharts baseOption={baseOption} dataOption={dataOption} containerId={containerId} width={width} height={height}/>
        );
    }
}
