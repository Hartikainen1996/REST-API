import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img className="responsive" src=""></img>
        <h1>Tervetuloa löytöeläin sivulle!</h1>
        <p>
          Täällä voit lisätä uuden löytöeläimen tietokantaan, poistaa
          löytäeläimen tietokannasta ja etsiä löytäeläintä tietokannasta.
        </p>
      </div>
    );
  }
}

export default Header;
