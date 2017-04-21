/**
 * 去除字符串中的html标记元素
 * @param originString
 */
export const formatStringWithHtml = (originString) => {
    const newString = originString.replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
    return newString;
};

