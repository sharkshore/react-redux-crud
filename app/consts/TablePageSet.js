/**
 * 存放分页相关的东西
 */

/**
 * 分页常数,用于表格
 * 每页显示10条
 */
export const pageSize=10;

/**
 * 分页常数,用于今日头条
 * @type {number}
 */
export const pageSize_Jrtt=5;

/**
 * 根据总数计算页数
 * @param length
 * @param pageSize
 */
export function countPageNum(length,pageSize){

    //根据总数计算页数
    let pageNum;
    if(length<=0)pageNum=1;
    if(length%pageSize==0)pageNum=Math.floor(length/pageSize);
    if(length%pageSize!=0)pageNum=Math.floor(length/pageSize)+1;
    return pageNum;

}

/**
 * 获取分页数据,用于前端分页
 * @param data
 * @param currentNum
 */
export function getDataByPage(data, currentNum,pageSize) {

    //首先获取表格的总页数
    let pageMaxNum=countPageNum(data.length,pageSize);

    //小于1页则返回第一页数据
    if(currentNum<=1){
        return data.slice(0,pageSize*1);
    }

    //大于最后一个则返回最后一页数据
    if(currentNum>=pageMaxNum){
        return data.slice(pageSize*(pageMaxNum-1),data.length);
    }
    return data.slice(pageSize*(currentNum-1),pageSize*currentNum);

}