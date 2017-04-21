import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import { formValueSelector, getFormValues,Field, reduxForm} from "redux-form";

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

import {
    URL_PREFIX,
    URL_CACHE_STRATEGY_INSERT,
    URL_CACHE_STRATEGY_UPDATE,

    URL_CACHE_STRATEGY_SEARCH
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
    <div >
        <TextField {...input} {...others} disabled={disabled} floatingLabelText={floatingLabelText} errorStyle={{color: 'orange'}} errorText={touched && error || warning}/>
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
class HcclDialog extends React.Component {

    handleSubmit(values) {
        if (this.props.dialog.title == '添加') {
            this.props.reqAdd(values);
        } else {
            this.props.reqUpdate(values);
        }
        //添加或者修改后,重新请求数据
        this.refresh();
        //重新跳回上一级
        this.props.dispatch(push('/credit-omsweb/hcpzgl/hcclgl'));
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
        const {autoCacheItem, autoCounterName, autoCacheType}=autoform;
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;

        //控制表单的使用
        let disabledAtUpdate = dialog.title == '修改' ?true :false;//弹出修改窗口时不能修改

        //控制表单的显隐
        let hide_in_addmode = dialog.title== '添加' ?'none' :'inline-block';//创建时间之类的字段在添加时不显示

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
                    <div style={{padding: '2.5rem 3.5rem 2.5rem 3.5rem'}}>
                        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                            <FieldSelect name="cacheItem" floatingLabelText="缓存项目" options={autoCacheItem} fullWidth={true}  disabled={disabledAtUpdate} validate={[V.REQUIRED]}/>
                            <Field name={'strategyName'} component={renderInput} type="text" floatingLabelText={'策略名称'} fullWidth={true}  validate={[V.REQUIRED]} />
                            <Field name={'counterId'} component={renderInput}type="text" floatingLabelText={'柜台ID'} fullWidth={true}  disabled={disabledAtUpdate} validate={[V.REQUIRED,V.LENGTH(7),V.NUMBER]} />
                            <FieldSelect name="counterName" floatingLabelText="柜台名称" options={autoCounterName} fullWidth={true} disabled={disabledAtUpdate} validate={[V.REQUIRED]} />
                            <FieldSelect name="cacheType" floatingLabelText="缓存类型" options={autoCacheType} fullWidth={true} disabled={disabledAtUpdate} validate={[V.REQUIRED]} />
                            <Field name={'cacheTime'} component={renderInput}  type="text" floatingLabelText={'缓存时间'} fullWidth={true}  style={{'display':(  this.props.cacheType=='REDIS'?'inline-block':'none')}}  />
                            <Field name={'createdAt'} component={renderInput} type="text" floatingLabelText={'创建时间'} fullWidth={true}  style={{'display':hide_in_addmode}} disabled={disabledAtUpdate} />
                            <Field name={'createdBy'} component={renderInput}  type="text" floatingLabelText={'创建人'} fullWidth={true}  disabled={disabledAtUpdate} validate={[V.REQUIRED]} />
                            <Field name={'updatedBy'} component={renderInput}  type="text" floatingLabelText={'最后更新人'}  fullWidth={true}  style={{'display':hide_in_addmode}} disabled={disabledAtUpdate}  />
                            {error && <strong>{error}</strong>}

                            <div style={{'textAlign':'right','marginTop':'1rem'}}>
                                <RaisedButton label="重置" primary={true} disabled={pristine || submitting} style={{margin: 12}} onClick={reset}/>
                                {/*<button type="submit" style={{padding: 0, border: 'none', backGround: 'none'}}> */}
                                    <RaisedButton type="submit" label={dialog.buttonName} primary={true} disabled={submitting}/>
                                {/*</button>*/}
                            </div>
                        </form>
                    </div>
                </Dialog>

            </div>
        );
    }
}


//验证
const validate = values => {
    const errors = {}
    if (values.cacheType && values.cacheType == 'REDIS') {
        if(!values.cacheTime){
            errors.cacheTime=`缓存类型为'缓存'时, 必须填写缓存时间`
        }else if (isNaN(Number(values.cacheTime))){
            errors.cacheTime=`缓存时间必须为数字`
        }else if(values.cacheTime< 1){
            errors.cacheTime=`不能小于1小时`;
        }else if(values.cacheTime >24*90){
            errors.cacheTime=`不能大于24*90小时`;
        }
    }
    return errors;
}


const form = reduxForm({
    form: 'form-hcclgl/dialog',
    validate
})(HcclDialog)

export default connect(
    (state, ownProps) => ({
        autoform: state.hcclgl_redux.form,
        dialog: state.hcclgl_redux.dialog,
        initialValues: state.hcclgl_redux.dialog.content,//初始值
        searchFormValues:getFormValues('form-hcclgl/select')(state),   //获取search表单的所有values
        cacheType:formValueSelector('form-hcclgl/dialog')(state,'cacheType'),//获取本表单中cacheType的值
        page:state.hcclgl_redux.page,
    }),
    (dispatch, ownProps) => ({
        reqPage: (params) => dispatch(
            {
                url: URL_PREFIX + URL_CACHE_STRATEGY_SEARCH,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqAdd: (params) => dispatch(
            {
                url: URL_PREFIX + URL_CACHE_STRATEGY_INSERT,
                params: params,
                types: [ACTION_ADD, ACTION_ADD_SUCCESS, ACTION_ADD_ERROR]
            }
        ),
        reqUpdate: (params) => dispatch(
            {
                url: URL_PREFIX + URL_CACHE_STRATEGY_UPDATE,
                params: params,
                types: [ACTION_UPDATE, ACTION_UPDATE_SUCCESS, ACTION_UPDATE_ERROR]
            }
        ),
        closeDialog: () => {
            dispatch({type: ACTION_DIALOG_CLOSE});
            dispatch(push('/credit-omsweb/hcpzgl/hcclgl'));
        }
    })
)(form);


