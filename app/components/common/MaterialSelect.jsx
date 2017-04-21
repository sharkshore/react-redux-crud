import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


/**
 * Material-ui风格的下拉列表组件
 * 默认第一个为空
 */
export default class MaterialSelect extends React.Component {
    static propTypes = {
        options:React.PropTypes.array.isRequired, //必须是name,vlaue的结构
        label:React.PropTypes.string.isRequired,  //标签
    };

    render() {
        const {label,options}=this.props;
        return (
            <SelectField {...this.props} floatingLabelText={label}  maxHeight={400}>
                <MenuItem value={''} primaryText=""/>
                {
                    options.map((option, i) => {
                        return (
                            <MenuItem value={option.value} key={i} primaryText={option.name}/>
                        )
                    })
                }
            </SelectField>
        );
    }
}



