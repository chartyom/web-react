import React from 'react';
import NavbarDefaultHeader from '../headers/NavbarDefaultHeader';

const HorizontalMenu = [
  { id: 1, url: "/", name: "Главная" },
  { id: 2, url: "/users", name: "Пользователи" }
];

const VerticalMenu = [
  {
    id: 1, name: "Главная1", sub: [
      { id: 3, url: "/documentation/id3", name: "Дочерняя3" },
      { id: 4, url: "/documentation/id4", name: "Дочерняя4" },
      {
        id: 5, name: "Дочерняя5", sub: [
          { id: 7, url: "/documentation/id7", name: "_Дочерняя7" },
          { id: 8, url: "/documentation/id8", name: "_Дочерняя8" },
          { id: 9, url: "/documentation/id9", name: "_Дочерняя9" },
          { id: 10, url: "/documentation/id10", name: "_Дочерняя10" },
        ]
      },
      { id: 6, url: "/documentation/id6", name: "Дочерняя6" },
    ]
  },
  { id: 2, url: "/documentation/id2", name: "Главная2" }
];



export default React.createClass({
  render: function () {
    return (
      <div className="app__main app__main--default">
        <header>
          <NavbarDefaultHeader links={HorizontalMenu} />
        </header>
        <article>
          <div className="app__main__left-content">
            <ul className="list-group">
              <li>
                <a href="#" className="list-group-item active">
                  Cras justo odio
                </a>
              </li>
              <a href="#" className="list-group-item">Dapibus ac facilisis in</a>
              <a href="#" className="list-group-item">Morbi leo risus</a>
              <a href="#" className="list-group-item">Porta ac consectetur ac</a>
              <a href="#" className="list-group-item">Vestibulum at eros</a>
            </ul>
          </div>
          <div className="app__main__right-content">
            {this.props.children}
          </div>
        </article>
      </div>
    );
  }
});