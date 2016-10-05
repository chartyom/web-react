import React from 'react';
import {Link} from 'react-router'

var NavigationListItem = React.createClass({
  render: function() {
    return <li><Link to={this.props.data.url}>{this.props.data.name}</Link></li>;
  }
});

export default React.createClass({
  render: function () {
    return (
      <nav className="navbar navbar--default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Documentation</Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
             {this.props.links.map(function(link) {
                return <NavigationListItem key={link.id} data={link}/>;
              }) }
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/auth"><span className="glyphicon glyphicon-user" ></span></Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
