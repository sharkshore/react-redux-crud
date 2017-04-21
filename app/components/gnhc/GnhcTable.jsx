import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton';

import { getFormValues} from "redux-form";

import Snackbar from 'material-ui/Snackbar'

import {pageSize, getDataByPage} from '../../consts/TablePageSet'


import MaterialTable from '../common/MaterialTable.jsx'
import  MaterialPager from '../common/MaterialPager.jsx'

import {
    URL_PREFIX,
    URL_FUNCTION_CACHE_STRATEGY_SEARCH
} from '../../consts/Urls'

import {
    TABLE_FIELDS,
    TABLE_TITLES,
    TABLE_TOPTITLE,

    ACTION_PAGE,
    ACTION_PAGE_SUCCESS,
    ACTION_PAGE_ERROR,

    ACTION_ADD,
    ACTION_ADD_SUCCESS,
    ACTION_ADD_ERROR,

    ACTION_UPDATE,
    ACTION_UPDATE_SUCCESS,
    ACTION_UPDATE_ERROR,

    ACTION_DELETE,
    ACTION_DELETE_SUCCESS,
    ACTION_DELETE_ERROR,

    ACTION_DIALOG_OPEN,
    ACTION_DIALOG_CLOSE,

    ACTION_ALERT_CLOSE,
    ACTION_ALERT_OPEN,

    ACTION_SNACK_CLOSE,
    ACTION_SNACK_OPEN

} from './redux/Redux'
import RefreshIndicator from "material-ui/RefreshIndicator";

/**
 * 身份证查询的表格
 */
class GnhcTable extends React.Component {

    constructor(props) {
        super(props);
        this.clickPager = this.clickPager.bind(this);
        this.delete = this.delete.bind(this);
        this.openDialogAndShowData = this.openDialogAndShowData.bind(this);
    }


    /**
     * 维护当前页码,该页码本组件用于提取数据,传入分页器用于显示页码
     * @param i
     */
    clickPager(i) {
        //设置参数
        let params = {
            ...this.props.values,
            pageSize: pageSize,
            pageNo: i//默认查询第一页
        };
        this.props.reqPage(params);//请求URL的数据
    }

    //删除数据
    delete(row) {
        let params = row;
        console.log('row');
        console.log(row);
        this.props.reqDelete(params);
        this.props.closeAlert();
    }

    //弹窗显示数据
    openDialogAndShowData(row) {
        let dialog = {
            status: true,
            title: '修改',
            content: row,
            buttonName: '修改'
        };
        this.props.openDialog(dialog);
    }


    render() {
        const {page, form, alert, snack} =this.props;
        const {openDialog, openAlert, closeAlert, closeSnack}=this.props;
        const pager = <MaterialPager pageSize={page.pageSize} totalCount={page.totalCount} totalCountShow={true}
                                     totalPageShow={true} currentNumber={page.pageNo} active={this.clickPager}/>
        let newList =page.list.map(item =>item.status=='Y'?{...item,status:'正常使用',}:{...item,status:'禁用'});
        //时间格式化
        return (
            <div style={{'position':'relative'}}>
                <MaterialTable topTitle={TABLE_TOPTITLE} titleNames={TABLE_TITLES} data={newList}
                               fieldAttributes={TABLE_FIELDS} pagerComponent={pager} dateFormmerFileds={['createdAt']}
                               rowTailComponents={[
                                   <RaisedButton label="显示详情" primary={true} action={this.openDialogAndShowData} style={{'marginRight': '1rem'}}/>,
                               ]}
                />
                <Snackbar bodyStyle={{'backgroundColor': snack.color}}  style={{'top':'4rem'}} open={snack.status} message={snack.message}
                          autoHideDuration={4000} onRequestClose={this.props.closeSnack}/>
                {/*  loading画面  */}
                <RefreshIndicator
                    size={60}
                    left={700}
                    top={100}
                    loadingColor="#FF9800"
                    status={this.props.loading}
                    style={{'display':'inline-block','postition':'relative'}}
                />
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        page: state.gnhc_redux.page,
        form: state.gnhc_redux.form,
        alert: state.gnhc_redux.alert,
        snack: state.gnhc_redux.snack,
        loading: state.gnhc_redux.loading,
        values: getFormValues('form-gnhc/select')(state),   //获取表单的所有values
    }),
    (dispatch, ownProps) => ({
        reqPage: (params) => dispatch(
            {
                url: URL_PREFIX + URL_FUNCTION_CACHE_STRATEGY_SEARCH,
                params: params,
                types: [ACTION_PAGE, ACTION_PAGE_SUCCESS, ACTION_PAGE_ERROR]
            }
        ),
        reqDelete: (params) => dispatch(
            // {
            //     url: URL_PREFIX + URL_CACHE_STRATEGY_DELETE,
            //     params: params,
            //     types: [ACTION_DELETE, ACTION_DELETE_SUCCESS, ACTION_DELETE_ERROR]
            // }
        ),
        openDialog: (dialog) => {
            dispatch({type: ACTION_DIALOG_OPEN, dialog});
            dispatch(push('/credit-omsweb/hcpzgl/gnhc/dialog'));
        },
        openAlert: (row) => dispatch({type: ACTION_ALERT_OPEN, row}),
        closeAlert: () => dispatch({type: ACTION_ALERT_CLOSE}),
        closeSnack: () => dispatch({type: ACTION_SNACK_CLOSE}),
    })
)(GnhcTable);




