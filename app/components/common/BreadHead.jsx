import React from 'react';
import {Link} from 'react-router';

import styles from './css/BreadHead.css'

/**
 *  面包屑导航
 */
export default class BreadHead extends React.Component {
    static propTypes={
        firstLevel:React.PropTypes.string.isRequired,
        firstUrl:React.PropTypes.string.isRequired,
        secondLevel:React.PropTypes.string,
        secondUrl:React.PropTypes.string,
        disabled:React.PropTypes.bool,
    };

    render() {
        const {firstUrl,firstLevel,secondUrl,secondLevel,disabled}=this.props;

        //如果disabled为true,则第二级不显示
        return (
            <h3 className={styles.root}>
                <span className={styles.content} >
                <span ><Link to={firstUrl} className={styles.span}>{firstLevel}</Link></span>
                    {
                        !disabled?<span> / <Link className={styles.span} to={this.props.secondUrl}>{this.props.secondLevel}</Link></span> :''
                    }
                </span>
            </h3>
        );
    }
}



