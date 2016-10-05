import React from 'react';
import ExampleBasicModalWindow from '../modalWindows/ExampleBasicModalWindow';
import ButtonElement from '../elements/ButtonElement';

export default React.createClass({
    handleCancel: function () {
        if (confirm('Are you sure you want to cancel?')) {
            this.refs.modal.close();
        }
    },
    render: function () {
        var modal = null;
        modal = (
            <ExampleBasicModalWindow
                ref="modal"
                confirm="OK"
                cancel="Cancel"
                onCancel={this.handleCancel}
                onConfirm={this.closeModal}
                onHidden={this.handleModalDidClose}
                title="Hello, Bootstrap!">
                This is a React component powered by jQuery and Bootstrap!
            </ExampleBasicModalWindow>
        );
        return (
            <div className="example">
                {modal}
                <ButtonElement onClick={this.openModal} className="btn-default">
                    Open modal
                </ButtonElement>
            </div>
        );
    },
    openModal: function () {
        this.refs.modal.open();
    },
    closeModal: function () {
        this.refs.modal.close();
    },
    handleModalDidClose: function () {
        alert("The modal has been dismissed!");
    }
});
