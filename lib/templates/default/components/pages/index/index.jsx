import React, { Component } from "react";
import styles from './index.scss';

class Index extends Component {

    componentDidMount() {
        console.log('Hello,next!');
    }

    render() {
        return (
            <div className="demo">
                <h2>Hello,next!</h2>
                <style jsx>{styles}</style>
            </div>
        )
    }
};

export default Index;