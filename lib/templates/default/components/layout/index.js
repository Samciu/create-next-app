/*
 * @Description: 页面模版外层
 * @Author: oushenzhao
 * @Date: 2019-04-30 16:26:24
 * @LastEditors: pengzhiyang
 * @LastEditDesc: 修改成导出 layout class
 * @LastEditTime: 2019-05-08 14:32:24
 */

import react, { Component } from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import styles from './index.scss';

// Sentry 初始化
import sentry from '../../utils/sentry';

const { Sentry, CaptureException } = sentry();

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            children, 
            title = 'This is the default title', 
            description, 
            className, 
            nav, 
            transparent,
            theme,
            about_easyrentcars, 
            advantages, 
            service_code
        } = this.props;
        
        return (
            <div id="root" className={className}>
                <Head>
                    <title>{title}</title>
                    <meta charSet='utf-8' />
                    <meta name="description" content={description} />
                </Head>
                <Header 
                    description={description} 
                    nav={nav}
                    transparent={transparent}
                />
        
                {children}
        
                <Footer 
                    theme={theme}   
                    key={2} 
                    about_easyrentcars={about_easyrentcars} 
                    advantages={advantages}
                    service_code={service_code} 
                />
                <style jsx>{styles}</style>
            </div>
        )
    }
}