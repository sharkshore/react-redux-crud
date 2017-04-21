//获取一个对象的所有属性值组成的数组
export const getValuesFromObj=(obj)=>{
    let result=[];
    if(typeof obj != 'object'){
       return[] ;
    }
    for(let p in obj){
        result.push(obj[p]);
    }
    return result;

}