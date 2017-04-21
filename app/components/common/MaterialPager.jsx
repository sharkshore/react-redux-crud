import React from 'react';
import styles from './css/MaterialPager.css'
import {countPageNum} from '../../consts/TablePageSet'


/**
 * Material-ui风格的分页组件
 *
 *  1)active函数如果调用外部接口,则变成后端分页模式
 *  2)active函数如果调用内部action,则变成前端分页模式
 *
 1.页数只有1页,只显示1页出来
 2.pageMaxNumber<=5,显示最多5页
 3.pageMaxNumber>=6
 1)如果当前页<=3页, 显示: 1,2,3,4,5
 2)如果当前页>=max-2页,显示:       max-4,max-3,max-2,max-1,max
 3)显示curr-2,curr-1,curr,curr+1,curr+2
 *
 * 调用示例:
 *
 let pager = <MaterialPager pageSize={pageSize} totalCount={totalCount} currentNumber={this.state.currentNumber} active={this.clickPager}/>
 *
 */
export default class MaterialPager extends React.Component {

    static propTypes = {
        pageSize: React.PropTypes.number.isRequired,//每页显示数量,
        totalCount: React.PropTypes.number.isRequired,//总数量,
        currentNumber: React.PropTypes.number.isRequired,//显示的当前页码,交由外部组件来维护(比如表格组件,建议在其他组件中定义内部state进行维护),表格需要知道当前页码来提取对应数据,pager需要知道当前页码进行相应展示
        active: React.PropTypes.func.isRequired,//钩子function,必须要有一个参数i,如pageActive:(currNumber)=>updatePagerAction(currNumber)
        totalCountShow: React.PropTypes.bool,//是否显示总数量,默认不显示
        totalPageShow: React.PropTypes.bool,//是否显示总页数,默认不显示
    };

    render() {
        const {totalCountShow, totalPageShow, totalCount, active, currentNumber, pageSize}=this.props;
        let pageMaxNumber = countPageNum(totalCount, pageSize);//计算得出总页数,带有保护措施
        let lis = [];//定义列表项,
        let nums = [];//存储列表项数字
        //2.pageMaxNumber<=5,显示最多5页
        if (pageMaxNumber <= 5) {
            for (let i = 1; i <= pageMaxNumber; i++) {
                lis.push(
                    <li key={i} onClick={active.bind(this, i)}><a href="javascript:void(0)"
                                                                  className={currentNumber == i ? styles.active : ''}>{i}</a>
                    </li>
                );
                nums.push(i);
            }
        }
        //3.pageMaxNumber>=6
        if (pageMaxNumber >= 6) {
            //1)如果当前页<=3页, 显示: 1,2,3,4,5
            if (currentNumber <= 3) {
                for (let i = 1; i <= 5; i++) {
                    lis.push(
                        <li key={i} onClick={active.bind(this, i)}><a href="javascript:void(0)"
                                                                      className={currentNumber == i ? styles.active : ''}>{i}</a>
                        </li>
                    );
                    nums.push(i);
                }
            }
            //2)如果当前页>=max-2页,显示:       max-4,max-3,max-2,max-1,max
            else if (currentNumber >= pageMaxNumber - 2) {
                for (let i = pageMaxNumber - 4; i <= pageMaxNumber; i++) {
                    lis.push(
                        <li key={i} onClick={active.bind(this, i)}><a href="javascript:void(0)"
                                                                      className={currentNumber == i ? styles.active : ''}>{i}</a>
                        </li>
                    );
                    nums.push(i);
                }
            }
            //3)显示curr-2,curr-1,curr,curr+1,curr+2
            else {
                for (let i = currentNumber - 2; i <= currentNumber + 2; i++) {
                    lis.push(
                        <li key={i} onClick={active.bind(this, i)}><a href="javascript:void(0)"
                                                                      className={currentNumber == i ? styles.active : ''}>{i}</a>
                        </li>
                    );
                    nums.push(i);
                }
            }
        }
        return (
            <div className={styles.root}>

                <span className={styles.beginspan}>
                    {
                        totalPageShow ?
                            <span className={styles.leftspan}>总页数:{pageMaxNumber}</span>
                            : ''
                    }
                    {
                        totalCountShow ?
                            <span>总条数:{totalCount}</span>
                            : ''
                    }
                </span>

                <ul className={styles.pagination}>
                    <li onClick={active.bind(this, 1)}><a href="javascript:void(0)">«</a></li>
                    {
                        //如果左边没有1,则显示出...
                        nums[0] != 1 ?
                            <li disabled="disabled"><a href="javascript:void(0)">...</a></li>
                            : ''
                    }
                    {lis}
                    {
                        //如果右边不是最大数,则显示出...
                        nums[nums.length - 1] != pageMaxNumber ?
                            <li disabled="disabled"><a href="javascript:void(0)">...</a></li>
                            : ''
                    }
                    <li onClick={active.bind(this, pageMaxNumber)}><a href="javascript:void(0)">»</a></li>
                </ul>
            </div>
        );
    }
}



