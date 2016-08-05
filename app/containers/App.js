/**
 * App进入总逻辑
 */
'use strict';

import React,{Component,PropTypes} from 'react';
import {View,StatusBar} from 'react-native';
/**
 * connect
 * 通过react-redux提供的connect方法，
 * 将包装好的组件链接到Redux。
 * 任何一个从connect() 包装好的组件都可以得到
 * dispath方法作为组件的props，以及全局state
 */
import { connect } from 'react-redux';
/**
 * bindActionCreators
 * 它把 action creators转成拥有同名Key的对象，
 * 使用 dispatch 把每个action包围起来，这样可以直接使用他们。
 *
 * 唯一使用 bindActionCreators的场景是：
 * 当需要把 action creator往下传到一个组件上，却不想让这个组件觉察到redux的存在，
 * 即：不希望将 redux store 和 dispatch传给它
 */
import {bindActionCreators} from 'redux';

import allActions from '../actions';//所有actions


import Splash from './Splash';//闪屏container
import ContentContainer from './ContentContainer';


class App extends Component {
    // 构造
    constructor(props) {
        super(props);
    }

    render() {
        const {application,actions,content,} = this.props;
        const {isShowSplash} = application;
        if (isShowSplash) {
            return (
                <Splash actions={actions}/>
            )
        }
        return (
            <View style={{flex:1}}>
                <StatusBar hidden={true}/>
                <ContentContainer {...this.props}/>
            </View>
        )
    }
}

App.propTypes = {
    application: PropTypes.object.isRequired,//
    content: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
}


function mapStateToProps(state) {
    return {
        application: {
            isShowSplash: state.application.isShowSplash
        },
        content: {
            sliders: state.content.sliders,
            excelList: state.content.excelList,
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(allActions, dispatch),
    }
}

/**
 * connnect
 * connect函数会调用两次，第一次设置参数，第二次是组件与redux store链接
 * connect不会修改传入的组件，而是返回一个新的与redux store连接的组件。
 *
 * connect第一个参数
 * 组件监听到redux store发送变化时，就会调用该函数，
 * 该函数必须返回一个对象，这对象会与组件的props合并
 *
 * connect第二个参数
 * 如果传递的是一个函数，该函数将会接收一个dispatch,然后自行返回一个对象。
 * 这个对象通过dispatch 函数与 action creator以某种方式绑定在一起（bindActionCreators）
 * 如果忽略了这个参数，dispatch将会注入到组件的props中。
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);