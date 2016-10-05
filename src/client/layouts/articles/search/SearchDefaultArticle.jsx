import React from 'react';

export default React.createClass({
  render: function () {
    return (
      <div className="search">
        <div className="results">
          {this.props.children}
        </div>
        <div className="search-footer pagination"></div>
      </div>
    );
  }
});
