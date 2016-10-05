import React from 'react';

export default React.createClass({
  render: function () {
    return (
      <button {...this.props}
        role="button"
        className={(this.props.className || '') + ' btn'} />
    );
  }
});
