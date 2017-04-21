import React from "react";
import {Field, reduxForm,getFormValues} from "redux-form";
import {connect} from "react-redux";
import {push} from 'react-router-redux'
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {pageSize} from "../../consts/TablePageSet";

import MenuItem from 'material-ui/MenuItem';


import {
    Checkbox,
    RadioButtonGroup,
    SelectField,
    Toggle,
    DatePicker
} from 'redux-form-material-ui'

import {
    URL_PREFIX,
    URL_FUNCTION_CACHE_STRATEGY_SEARCH,
    URL_GET_STRATEGY_ID_AUTO
} from "../../consts/Urls";
import styles from "./css/SearchForm .css";

import {
    ACTION_DIALOG_CLOSE,
    ACTION_DIALOG_OPEN,
    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,

    ACTION_AUTO,
    ACTION_AUTO_SUCCESS,
    ACTION_AUTO_ERROR
} from "./redux/Redux";


/*renderInput|参数效验*/
const renderInput = ({input, label, type, meta: {touched, error, warning}}) => (
    <div className={styles.inlineField}>
        <TextField {...input} floatingLabelText={label} errorStyle={{color: 'orange'}}
                   errorText={touched && ((error && {error}) || (warning && {warning}))} style={{'width': '10rem'}}/>
    </div>
)

/*  下拉列表  */
const FieldSelect = ({name, floatingLabelText, options, ...others}) => (
    <Field {...others} name={name} component={SelectField} floatingLabelText={floatingLabelText}>
        <MenuItem value={null} primaryText={'选择全部'} />
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
 * 查询表单,\
 * 因为控件已经有了很强的参数效验,所以不需要使用redux-form了
 */
class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.openDialogAndShowData = this.openDialogAndShowData.bind(this);
    }

    //查询按钮
    handleSubmit(values) {
        //设置参数
        let params = {
            ...values,
            pageSize: pageSize,
            pageNo: 1//默认查询第一页
        };

        this.props.reqData(params);//请求URL的数据
    }

    //弹窗显示数据
    openDialogAndShowData() {
        let dialog = {
            status: true,
            title: '添加',
            content: {},
            buttonName: '添加'
        };
        this.props.openDialog(dialog);
    }

    //组件渲染结束
    componentDidMount() {
        //设置参数
        let params = {
            pageSize: pageSize,
            pageNo: 1//默认查询第一页
        };
        this.props.reqData(params);//请求URL的数据
        this.props.reqAuto();//获取下拉列表的数据
    }

    render() {
        //react-reudux提供的props
        const {exceptionTypes, exceptionContents, loading,autoform}=this.props;
        //redux-form提供的props
        const {error, handleSubmit, reset, submitting, pristine}=this.props;
        const {cacheStrategyId}=autoform;

        let options=[];
        cacheStrategyId.map((item)=>{
            options.push({name:item,value:item});
            return item;
        });

        let statusOptions =[
            {name:'正常使用',value:'Y'},
            {name:'禁用',value:'N'}
        ];

        return (
            <div className={styles.root}>
                <form className={styles.form} onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                    <Field name="productType" component={renderInput} type="text" label="产品类型" style={{'width': '10rem'}}/>
                    <Field name="functionId" component={renderInput} type="text" label="功能ID" style={{'width': '10rem'}}/>
                    <Field name="productName" component={renderInput} type="text" label="产品名称" style={{'width': '10rem'}}/>

                    <FieldSelect name="cacheStrategyId" floatingLabelText="策略集合" options={options} style={{'top':'.9rem','marginRight':'2rem','width':'12rem'}}   />
                    <FieldSelect name="status" floatingLabelText="启用状态" options={statusOptions} style={{'top':'.9rem','marginRight':'2rem','width':'12rem'}}   />

                    <span>
                        <RaisedButton label="重置" primary={true} disabled={pristine || submitting} style={{margin: 12}} onClick={reset}/>
                        {/*<button type="submit" style={{padding: 0, border: 'none', backGround: 'none'}}> */}
                            <RaisedButton type="submit" label={'查询'} primary={true} disabled={submitting}/>
                        {/*</button>*/}
                    </span>
                    <div className={styles.right} style={{'top':'2.2rem'}} >
                        <RaisedButton label="添加" primary={true} style={{margin: 12}} onClick={this.openDialogAndShowData}/>
                    </div>
                </form>

            </div>
        );
    }
}

const form = reduxForm({
    form: 'form-gnhc/select',
})(SearchForm)

export default connect(
    (state, ownProps) => ({
        autoform: state.gnhc_redux.form,
        values: getFormValues('form-gnhc/select')(state),   //获取表单的所有values
    }),
    (dispatch, ownProps) => ({
        reqData: (params) => dispatch(
            {
                url: URL_PREFIX + URL_FUNCTION_CACHE_STRATEGY_SEARCH,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqAuto: (params) => dispatch(
            {
                url: URL_PREFIX + URL_GET_STRATEGY_ID_AUTO,
                params: params,
                types: [ACTION_AUTO,ACTION_AUTO_SUCCESS,ACTION_AUTO_ERROR]
            }
        ),
        openDialog: (dialog) => {
            dispatch({type: ACTION_DIALOG_OPEN, dialog});
            dispatch(push('/credit-omsweb/hcpzgl/gnhc/dialog'));
        },
    })
)(form);




