import React from 'react';
import echarts from 'echarts';

/**
 * 自定义Echarts公共组件
 * 实现数据更新,自动刷新组件
 */
export default class MyEcharts extends React.Component {

    static propTypes={
        baseOption:React.PropTypes.object.isRequired,//基本参数项
        dataOption:React.PropTypes.object.isRequired,//数据参数项
        containerId:React.PropTypes.string.isRequired,//容器的ID
        width:React.PropTypes.string.isRequired,//容器的宽度
        height:React.PropTypes.string.isRequired,//容器的高度
    };

    //组件更新完毕
    //数据如果变化,自动setOption
    componentDidUpdate(){
        this.mychart.setOption(this.props.dataOption);
        console.log(this.props.containerId+"重新渲染...");
    }

    //初次渲染成功,生命周期内只运行一次
    componentDidMount() {
        this.mychart=echarts.init(document.getElementById(this.props.containerId));
        this.mychart.setOption(this.props.baseOption);
        this.mychart.setOption(this.props.dataOption);
        console.log(this.props.containerId+"初始化图形...");
        //添加点击事件
/*        this.mychart.on('click',(params)=>{
            console.log(params);
        })*/
    }

    render() {
        const {containerId,width,height}=this.props;
        return (
            <div id={containerId}  style={{width:width,height:height}} >
            </div>
        );
    }
}



