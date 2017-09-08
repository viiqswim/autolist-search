import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div className="container text-center">
            <div style={{ margin: 'auto', width: '64px' }}>
                <ReactLoading type="cylon" color="#444" />
            </div>
            <h4> Loading. Please wait... </h4>
        </div>
    );
};

export default Loading;

