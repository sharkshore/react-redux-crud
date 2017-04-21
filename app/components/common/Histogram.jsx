import React from 'react';

import MyEcharts from './Echarts.jsx'


/**
 * 自定义柱状图组件,默认有3个视图
 * 在MyEcharts基础上再度封装
 * 用户只需给定baseOptionSet和dataOptionSet
 */
export default class Histogram extends React.Component {

    static propTypes = {
        baseOptionSet: React.PropTypes.object.isRequired,//定制的参数项
        dataOptionSet: React.PropTypes.object.isRequired,//需要变化的数据
        containerId: React.PropTypes.string.isRequired,//容器的ID
        width: React.PropTypes.string.isRequired,//容器的宽度
        height: React.PropTypes.string.isRequired,//容器的高度
    };

    render() {
        //DATA和Histogram_SERIES_NAMES是两个数组,并且size应该相同
        const { baseOptionSet, dataOptionSet,containerId, width, height}=this.props;
        const {  Histogram_TITLE,Histogram_X_AXIS_TITLE,Histogram_Y_AXIS_TITLE,Histogram_SERIES_NAMES,Histogram_TOOL_TIP_FORMATTER     } =baseOptionSet;
        const {DATA,SUB_TITLE, X_AXIS_ARRAY,}=dataOptionSet;
        //柱状图的颜色列表
        const colors=['rgba(17, 168,171, 1)','#FF1493','#800080'];

        //1.根据Histogram_SERIES_NAMES的size生成baseOption中用到的series
        let baseSeries=[];
        Histogram_SERIES_NAMES.map((h,i)=>{
            let serie={
                name: h,
                type: 'bar',
                data: [],
                barMinHeight: 2,
                barMaxWidth:30,
                itemStyle: {
                    normal: {
                        color: colors[i],
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                }
            };
            baseSeries.push(serie);
        });

        //2.根据DATA的size生成dataOption中用到的series
        let dataSeries=[];
        DATA.map((d,i)=>{
            let serie={
                name: Histogram_SERIES_NAMES[i],
                data:d
            };
            dataSeries.push(serie);
        });

        // 指定图表的配置项和数据
        const baseOption = {
            title: {
                text: Histogram_TITLE,
                x: 'center',
                subtext: SUB_TITLE,
                subtextStyle: {
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: Histogram_TOOL_TIP_FORMATTER,
            },
            toolbox: {
                left: '10%',
                itemSize: 16,
                feature: {
                    saveAsImage: {
                        type: 'jpeg',
                        pixelRatio: 2
                    },
                    dataView: {
                        readOnly: true,
                    },
                    dataZoom: {},
                    magicType: {
                        type: ['line', 'bar'],
                    },
                }
            },
            dataZoom: [
                {
                    type: 'slider',
                    start: 0,
                    end: 55,
                }

            ],
            legend: {
                show: true,
                data: Histogram_SERIES_NAMES,
                right: 0,
                selected: {},
                selectedMode: 'single'
            },
            grid: {
                left: '0%',
                right: '5%',
                bottom: '10%',
                borderColor: 'white',
                containLabel: true,
                show: true,
            },
            xAxis: {
                name: Histogram_X_AXIS_TITLE,
                nameLocation: 'middle',
                nameGap: 25,
                nameTextStyle: {
                    color: 'black',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 18

                },
                type: 'category',
                data: X_AXIS_ARRAY,
                axisTick: {
                    alignWithLabel: true,
                    interval: 0
                },
                axisLabel: {
                    interval: 'auto'
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                name: Histogram_Y_AXIS_TITLE,
                nameLocation: 'end',
                nameGap: 5,
                nameTextStyle: {
                    color: 'black',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 18
                },
                axisTick: {
                    alignWithLabel: true
                },
                splitLine: {
                    show: false
                }
            },
            series: baseSeries,
        };
        const dataOption = {
            title: {
                subtext: SUB_TITLE,
            },
            xAxis: {
                data: X_AXIS_ARRAY,
            },
            series: dataSeries
        };

        console.log('dataOption:');
        console.log(dataOption);
        return (
            <MyEcharts baseOption={baseOption} dataOption={dataOption} containerId={containerId} width={width} height={height}/>
        );
    }
}



