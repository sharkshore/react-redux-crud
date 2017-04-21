import React from 'react';

export default class SimpleTable extends React.Component {
    handleDelete(g,e){
        e.preventDefault();
        this.props.delete(g);
    }
    handleUpdate(g,e){
        e.preventDefault();
        this.props.detail(g);
    }
    render() {
        const {titles, datas,fieldNames} =this.props;
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        {
                            titles.map((t, i) => {
                                return (
                                    <td key={i}>{t}</td>
                                )
                            })
                        }
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        datas.map((d, i) => {
                            return (
                                <tr key={i}>
                                    {
                                        fieldNames.map((a, j) => {
                                            return (
                                                <td key={j}>{d[a]}</td>
                                            )
                                        })
                                    }
                                    <td><a href="/" onClick={this.handleUpdate.bind(this,d)}>编辑</a></td>
                                    <td><a href="/" onClick={this.handleDelete.bind(this,d)}>删除</a></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>

                </table>
            </div>
        );
    }
}
SimpleTable.propTypes = {
    titles: React.PropTypes.array.isRequired,
    datas: React.PropTypes.array.isRequired,
    fieldNames: React.PropTypes.array.isRequired,
    delete:React.PropTypes.func.isRequired,
    detail:React.PropTypes.func.isRequired
}


