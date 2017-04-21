import React from 'react';
import MyEcharts from './Echarts.jsx'


/**
 * 自定义扇形图组件,默认有一个视图
 * 在MyEcharts基础上再度封装
 * 用户只需给定baseOptionSet和dataOptionSet
 */
export default class FanChart extends React.Component {

    static propTypes = {
        baseOptionSet: React.PropTypes.object.isRequired,//定制的参数项
        dataOptionSet: React.PropTypes.object.isRequired,//需要变化的数据
        containerId: React.PropTypes.string.isRequired,//容器的ID
        width: React.PropTypes.string.isRequired,//容器的宽度
        height: React.PropTypes.string.isRequired,//容器的高度
    };

    render() {
        const {baseOptionSet,dataOptionSet, containerId, width, height}=this.props;
        const {FanChart_TITLE,  FanChart_LEGEND_DATA, FanChart_TOOL_TIP_FORMATTER, } =baseOptionSet;
        let {}=baseOptionSet;
        const {DATA_TOTAL,SUB_TITLE}=dataOptionSet;

        const baseOption = {
            title: {
                text: FanChart_TITLE,
                x: 'center',
                subtext: SUB_TITLE,
                subtextStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: FanChart_TOOL_TIP_FORMATTER,
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                formatter: '{name}ms',
                data: FanChart_LEGEND_DATA,
                selectedMode: true
            },
            series: [
                {
                    name: 'one',
                    type: 'pie',
                    radius: '58%',
                    center: ['40%', '65%'],
                    data: [],
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: '{b}ms\n{d}%',
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                        }

                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        let dataOption = {
            title: {
                subtext: SUB_TITLE,
            },
            series: [{
                name: 'one',
                data:DATA_TOTAL
                // data: [ { "name":"0-200", "value":0 }, { "name":"200-400", "value":0 }, { "name":"400-600", "value":0 }, { "name":"600-800", "value":0 }, { "name":"800-1000", "value":0 }, { "name":"1000-1300", "value":0 }, { "name":"1300-1500", "value":0 }, { "name":"1500-2000", "value":0 }, { "name":"2000-4000", "value":0 }, { "name":"4000-6000", "value":0 }, { "name":">6000", "value":0 } ]
            },
            ]
        }

        return (
            <MyEcharts baseOption={baseOption} dataOption={dataOption} containerId={containerId} width={width} height={height}/>
        );
    }
}
