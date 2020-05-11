import React from "react";

const Contacts = ({ animal }) => {
  return (
    <div>
      <center>
        <h1>Contact List</h1>
      </center>
      {animal.map((animal) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{animal.rotu}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{animal.laji}</h6>
            <p class="card-text">{animal.paino}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
