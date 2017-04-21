

/**
 * 时间===>年月日的字符串格式,2017-03-08
 */
export const dateToString = (date) => {
    const year = date.getFullYear();
    let month = parseInt(date.getMonth()) + 1;
    let day = date.getDate();
    //将2017-3-27  ===> 2017-03-27
    if(month<10)month='0'+month;
    if(day<10)day='0'+day;
    return `${year}-${month}-${day}`;
};

/**
 * 时间戳===>年月日时分的字符串格式,2017-03-08 23:59
 */
export const timeStampToStringHHmm = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const year = date.getFullYear();
    let month = parseInt(date.getMonth()) + 1;
    let day = date.getDate();
    if(month<10)month='0'+month;
    if(day<10)day='0'+day;
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${year}-${month}-${day} ${hour}:${minute}`;
};

/**
 * 时间戳===>年月日的字符串格式,2017-03-08
 */
export const timeStampToString = (timestamp) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const year = date.getFullYear();
    let month = parseInt(date.getMonth()) + 1;
    let day = date.getDate();
    if(month<10)month='0'+month;
    if(day<10)day='0'+day;
    return `${year}-${month}-${day}`;
};

/**
 *  昨天的日期字符串,格式:2017-03-28
 */
export const getLastDayStr=()=>{
    var day1 = new Date();
    day1.setTime(day1.getTime()-24*60*60*1000);
    var year=day1.getFullYear();
    var month=parseInt(day1.getMonth())+1;
    var day=day1.getDate();
    if(month<10)month='0'+month;
    if(day<10)day='0'+day;
    return year+"-"+month+"-"+day;
}

/**
 * 获取30天以前的时间
 * @param date
 * @returns {Date}
 */
export const getLastMonth=(date)=>{
    let day=new Date();
    day.setTime(day.getTime()-24*60*60*1000*30);
    return day;
}


/**
 * 生成时间字符串数组
 * @param beginDate
 * @param endDate
 */
export function generateDateArray(beginDate,endDate){


}