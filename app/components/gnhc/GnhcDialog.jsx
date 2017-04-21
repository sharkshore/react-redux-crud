import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {getFormValues,Field, reduxForm} from "redux-form";

import {pageSize} from '../../consts/TablePageSet'


import * as V from '../../consts/ValidateReduxForm'

import {
    FlatButton,
    Dialog,
    RaisedButton,
    MenuItem,
    Checkbox,
    RadioButtonGroup,
    SelectField,
    TextField,
    Toggle,
    DatePicker
} from 'material-ui'

import MaterialSelect from '../../components/common/MaterialSelect.jsx'

import {
    URL_PREFIX,
    URL_FUNCTION_CACHE_STRATEGY_SEARCH,
    URL_FUNCTION_CACHE_STRATEGY_UPDATE,
    URL_FUNCTION_CACHE_STRATEGY_INSERT
} from '../../consts/Urls'


import {
    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,

    ACTION_ADD,
    ACTION_ADD_SUCCESS,
    ACTION_ADD_ERROR,

    ACTION_UPDATE,
    ACTION_UPDATE_SUCCESS,
    ACTION_UPDATE_ERROR,

    ACTION_DIALOG_CLOSE
} from './redux/Redux'



/*renderInput|参数效验*/
const renderInput = ({input, label, floatingLabelText, type, disabled, meta: {touched, error, warning}, ...others}) => (
    <div style={{'marginRight': '2rem'}}>
        <TextField {...input} {...others} disabled={disabled} floatingLabelText={floatingLabelText} errorStyle={{color: 'orange'}}
                   fullWidth={true}
                   errorText={touched && error || warning}/>
    </div>
)


/*renderSelectField|参数效验*/
const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField floatingLabelText={label} errorText={touched && error} {...input} onChange={(event, index, value) => input.onChange(value)} children={children} errorStyle={{color: 'orange'}} {...custom}/>
)


/*  下拉列表  */
const FieldSelect = ({name, floatingLabelText, options, ...others}) => (
    <Field {...others} name={name} component={renderSelectField} floatingLabelText={floatingLabelText}>
        {
            options.map((item, i) => {
                return (
                    <MenuItem value={item.value} primaryText={item.name} key={i}/>
                )
            })
        }
    </Field>
)




/**
 * 详细表单
 */
class GnhcDialog extends React.Component {

    handleSubmit(values) {
        console.log(values);
        if (this.props.dialog.title == '添加') {
            values.status = 'Y';
            values.createdAt = Date.parse(new Date());
            this.props.reqAdd(values);
        } else {
            if(values.status=='正常使用'){
                values.status = 'Y';
            }else{
                values.status = 'N';
            }
            this.props.reqUpdate(values);
        }
        //添加或者修改后,重新请求数据
        this.refresh();
        //重新跳回上一级
        this.props.dispatch(push('/credit-omsweb/hcpzgl/gnhc'));
    }


    //重新请求数据
    refresh(){
        console.log(this.props.searchFormValues);
        let params = {
            ...this.props.searchFormValues,
            pageSize: pageSize,
            pageNo: this.props.page.pageNo//默认查询第一页
        };
        this.props.reqPage(params);//请求URL的数据
    }


    render() {
        const {closeDialog, dialog, autoform} =this.props;
        //获取下拉列表
        const {cacheStrategyId}=autoform;
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;

        //控制表单的使用
        let disabledAtUpdate = dialog.title == '修改' ?true :false;//弹出修改窗口时不能修改

        //控制表单的显隐
        let hide_in_addmode = dialog.title== '添加' ?'none' :'inline-block';//创建时间之类的字段在添加时不显示

        let cacheStrategyIdOptions=[];
        cacheStrategyId.map((item)=>{
            cacheStrategyIdOptions.push({name:item+'',value:item+''});
            return item;
        });
        let statusOptions =[
            {name:'正常使用',value:'正常使用'},
            {name:'禁用',value:'禁用'}
        ];



        return (
            <div>
                <Dialog
                    title={dialog.title}
                    actions={[
                        <FlatButton label="关闭" primary={true} keyboardFocused={true} onTouchTap={closeDialog}/>,
                    ]}
                    modal={false}
                    open={dialog.status}
                    onRequestClose={closeDialog}
                    autoScrollBodyContent={true}
                >
                    <div style={{padding: '2.5rem'}}>
                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>

                            <Field name={'productType'} hintText="请输入最多4位数字" component={renderInput} type="text" floatingLabelText={'产品类型'} disabled={disabledAtUpdate} validate={[V.REQUIRED,V.MAXLENGTH(4),V.NUMBER]}/>
                            <Field name={'functionId'} hintText="请输入最多10位数字" component={renderInput}type="text" floatingLabelText={'功能ID'} disabled={disabledAtUpdate} validate={[V.REQUIRED,V.MAXLENGTH(10),V.NUMBER]} />

                            <Field name={'productName'} hintText="请输入产品名称" component={renderInput} type="text" floatingLabelText={'产品名称'}  validate={[V.REQUIRED]} />
                            <Field name={'priority'} hintText="请输入最多3位数字" type="text" component={renderInput} floatingLabelText={'优先级'}  validate={[V.REQUIRED,V.MAXLENGTH(3),V.NUMBER]} />
                            <FieldSelect name="cacheStrategyId" floatingLabelText="策略集合" options={cacheStrategyIdOptions} fullWidth={true} validate={[V.REQUIRED]}/>

                            <FieldSelect name="status" floatingLabelText="启用状态" options={statusOptions} style={{'display':( dialog.title == '修改'?'inline-block':'none')}} fullWidth={true} validate={[]}/>

                            <Field name={'createdBy'} hintText="请输入创建人" component={renderInput} type="text" floatingLabelText={'创建人'} disabled={disabledAtUpdate} validate={[V.REQUIRED]} />
                            <Field name={'updatedBy'} hintText="请输入最后更新人" component={renderInput} type="text" floatingLabelText={'最后更新人'}  validate={[V.REQUIRED]} />


                            {error && <strong>{error}</strong>}
                            <div style={{'textAlign':'right','marginTop':'1rem'}}>
                                <RaisedButton label="重置" primary={true} disabled={pristine || submitting} style={{margin: 12}} onClick={reset}/>

                                {/*<button type="submit" style={{padding: 0, border: 'none', backGround: 'none'}}> */}
                                    <RaisedButton type="submit"  label={dialog.buttonName} primary={true} disabled={submitting}/>
                                {/*</button>*/}

                            </div>
                        </form>
                    </div>
                </Dialog>

            </div>
        );
    }
}





const form = reduxForm({
    form: 'from-gnhc/dialog'
})(GnhcDialog)

export default connect(
    (state, ownProps) => ({
        autoform: state.gnhc_redux.form,
        dialog: state.gnhc_redux.dialog,
        initialValues: state.gnhc_redux.dialog.content,//初始值
        searchFormValues:getFormValues('form-gnhc/select')(state),   //获取search表单的所有values
        page:state.gnhc_redux.page,
    }),
    (dispatch, ownProps) => ({
        reqPage: (params) => dispatch(
            {
                url: URL_PREFIX + URL_FUNCTION_CACHE_STRATEGY_SEARCH,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqAdd: (params) => dispatch(
            {
                url: URL_PREFIX + URL_FUNCTION_CACHE_STRATEGY_INSERT,
                params: params,
                types: [ACTION_ADD, ACTION_ADD_SUCCESS, ACTION_ADD_ERROR]
            }
        ),
        reqUpdate: (params) => dispatch(
            {
                url: URL_PREFIX + URL_FUNCTION_CACHE_STRATEGY_UPDATE,
                params: params,
                types: [ACTION_UPDATE, ACTION_UPDATE_SUCCESS, ACTION_UPDATE_ERROR]
            }
        ),
        closeDialog: () => {
            dispatch({type: ACTION_DIALOG_CLOSE});
            dispatch(push('/credit-omsweb/hcpzgl/gnhc'));
        }
    })
)(form);





