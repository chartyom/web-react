import React from 'react';

export default React.createClass({
    render: function () {
        return (
            <div className={'container error-page error-page--' + (this.props.theme || 'default') }>
                <div className="row">
                    <div className="error-page__elem col-md-4 col-md-offset-2">
                        <h1>Error: 404</h1>
                        <h2>Page not found</h2>
                    </div>
                </div>
            </div>
        );
    }
});