import React from 'react';

export default React.createClass({
  render: function () {
    return (
      <a {...this.props}
        href={(this.props.href || 'javascript:;')}
        role="button"
        className={(this.props.className || '') + ' btn'} />
    );
  }
});
