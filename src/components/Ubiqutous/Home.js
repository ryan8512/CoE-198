import React from 'react';
 
const home = () => {
    return (
       <div>
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                  <h1 class="display-4">Secure and Accessible Election for Everyone</h1>
                  <p class="lead">Plan your election now</p>
                </div>
            </div>
            <div class="container">
              <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="./img/secure_image.jpg" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                      <img src="./img/accessibility.jpg" class="d-block w-100" alt="..."/>
                    </div>
                  </div>
              </div>
            </div>
       </div>
    );
}
 
export default home;