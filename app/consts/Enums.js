/**
 * 存放本项目用到的enum映射
 * @type {{0: string, 1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string}}
 */
//返回时长等级与字符串的转换
export const LevelToStr={
    0:'<0',
    1:'0-200',
    2:'200-400',
    3:'400-600',
    4:'600-800',
    5:'800-1000',
    6:'1000-1300',
    7:'1300-1500',
    8:'1500-2000',
    9:'2000-4000',
    10:'4000-6000',
    11:'>6000',
}

//身份证的产品
export const IdCardProductToStr={
    '0.0':'默认产品',
    '1.0':'身份证返照片',
    '2.0':'身份证不返照片'
};

//银行卡的产品
export const BankCardProductToStr={
    '0.0':'默认产品',
}
