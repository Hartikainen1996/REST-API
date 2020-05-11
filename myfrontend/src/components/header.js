import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img className="responsive" src="eläimet.png"></img>
        <h1>Tervetuloa löytöeläin sivustolle!</h1>
        <h2>
          Oletko hukannut lemmikkisi ja tahtoisit tehdä siitä ilmoituksen?
        </h2>

        <p>
          Tällä sivustolla voit lisätä uuden eläimen tietokantaan, poistaa
          eläimen tietokannasta ja etsiä eläintä tietokannasta.
        </p>
      </div>
    );
  }
}

export default Header;
