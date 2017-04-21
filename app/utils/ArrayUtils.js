/**
 * 对象数组的group操作|计算求和
 * 以某个字段或者多个字段进行group,进行求和操作
 * group的精髓在于循环比对
 * @param sourceArray  原对象数组
 * @param sumField  要求和的字段
 * @param groupFields   要分组的字段,可以是多个,一个数组
 * @returns {Array}
 */
export function groupSum(sourceArray,sumField,...groupFields){

    let source=JSON.parse(JSON.stringify(sourceArray));

    let finalResult=[];

    //对数据进行聚合求和操作,只保留...groupField,countField
    for (let i = 0; i < source.length; i++) {
        let r = source[i];
        if (finalResult.length == 0) {
            finalResult.push(r);//如果是空,直接先放进去
        } else {
            //循环比对和结果集中有没有相同的元素,有则进行聚合求和运算
            let Exists = false;//标记是否在finalResult中找到相同的元素的group字段
            for (let j = 0; j < finalResult.length; j++) {
                let f = finalResult[j];
                //循环比对要分组的所有字段
                let AllFieldsSame=true;//标记需要比对的字段都相同
                for(let g of groupFields){
                    if (r[g]!=f[g] ) {
                        AllFieldsSame=false; //只要有一个字段不同,就终止循环跳出去
                        break;
                    }
                }
                //表明已经比对上了
                if(AllFieldsSame){
                    f[sumField]+= r[sumField]; //进行sum的累加操作
                    Exists=true;//标记已经找到了,并且进行了累加
                }
            }
            if (!Exists) {
                finalResult.push(r);//如果没有相同的groupFields,就作为一个新系列放进去
            }
        }
    }
    return finalResult;

}


/**
 * 对象数组中指定字段的值组成的不重复新数组
 * selectField只能是单个字段
 * @param sourceArray  原对象数组
 * @param selectField  要查询的字段
 */
export function selectFieldArray(sourceArray,selectField,){
    let finalResult=[];

    //对数据进行聚合求和操作,只保留...groupField,countField
    for (let i = 0; i < sourceArray.length; i++) {
        let r = sourceArray[i];
        if (finalResult.length == 0) {
            finalResult.push(r[selectField]);//如果是空,直接先放进去
        } else {
            //循环比对和结果集中有没有相同的元素,有则进行聚合求和运算
            let Exists = false;//标记是否在finalResult中找到相同的元素的group字段
            for (let j = 0; j < finalResult.length; j++) {
                let f = finalResult[j];
                if (r[selectField]==f ) {
                    Exists=true;
                    break;
                }
            }
            if (!Exists) {
                finalResult.push(r[selectField]);//如果没有相同的groupFields,就作为一个新系列放进去
            }
        }
    }

    //对结果数据进行排序
    //暂时没有实现

    return finalResult;
}
