import React from 'react';
 
const authors = () => {
    return (
    <div class="row py-3 text-center">
        <div class="col-md-6 col-lg-3">
          <div class="card">
            <img src={require("./img/Rigo.jpg")} height="400"/>
            <div class="card-body">
              <h3 class="card-title" >Pascua, John Raphael </h3>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum d
                olore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card">
            <img src={require("./img/sam.jpg")} alt="Card image cap" height="400"/>
            <div class="card-body">
              <h3 class="card-title" >Tan, Samuel Ryan D.</h3>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum d
                olore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>>
          </div>
        </div>
    </div>
    );
}
 
export default authors;