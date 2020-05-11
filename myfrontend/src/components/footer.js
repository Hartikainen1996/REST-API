import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>
          <label>
            Made by{" "}
            <a href="https://github.com/Hartikainen1996">Eemil Hartikainen</a>
          </label>
          <span> © 2020 All Rights Reserved</span>
        </p>
      </div>
    );
  }
}

export default Footer;
