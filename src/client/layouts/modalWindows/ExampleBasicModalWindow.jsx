import React from 'react';
import ButtonElement from '../elements/ButtonElement';

export default  React.createClass({
  // The following two methods are the only places we need to
  // integrate Bootstrap or jQuery with the components lifecycle methods.
  componentDidMount: function () {
    // When the component is added, turn it into a modal
    $(this.refs.root).modal({ backdrop: 'static', keyboard: false, show: false });

    // Bootstrap's modal class exposes a few events for hooking into modal
    // functionality. Lets hook into one of them:
    $(this.refs.root).on('hidden.bs.modal', this.handleHidden);
  },
  componentWillUnmount: function () {
    $(this.refs.root).off('hidden.bs.modal', this.handleHidden);
  },
  close: function () {
    $(this.refs.root).modal('hide');
  },
  open: function () {
    $(this.refs.root).modal('show');
  },
  render: function () {
    var confirmButton = null;
    var cancelButton = null;

    if (this.props.confirm) {
      confirmButton = (
        <ButtonElement
          onClick={this.handleConfirm}
          className="btn-primary">
          {this.props.confirm}
        </ButtonElement>
      );
    }
    if (this.props.cancel) {
      cancelButton = (
        <ButtonElement onClick={this.handleCancel} className="btn-default">
          {this.props.cancel}
        </ButtonElement>
      );
    }

    return (
      <div className="modal fade" ref="root">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.handleCancel}>
                &times;
              </button>
              <h3>{this.props.title}</h3>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {cancelButton}
              {confirmButton}
            </div>
          </div>
        </div>
      </div>
    );
  },
  handleCancel: function () {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  },
  handleConfirm: function () {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  },
  handleHidden: function () {
    if (this.props.onHidden) {
      this.props.onHidden();
    }
  }
});
