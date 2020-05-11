import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img className="responsive" src="eläimet.png"></img>
        <h1>Tervetuloa löytöeläin sivustolle!</h1>
        <p>
          Oletko hukannut lemmikkisi ja tahtoisit tehdä siitä ilmoituksen? Tällä
          sivustolla voit lisätä uuden löytöeläimen tietokantaan, poistaa
          löytäeläimen tietokannasta ja etsiä löytäeläintä tietokannasta.
        </p>
      </div>
    );
  }
}

export default Header;
