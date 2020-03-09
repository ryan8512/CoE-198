import React from 'react';
import {Button} from 'reactstrap';

 
const Footer = () => {
    return (
      <div>
        <hr className="my-3" />
        <div class="text-center">
          <h5> Documentation and Source Files</h5>
          <Button color="secondary">GitHub</Button>{' '}
          <Button color="secondary">White Paper</Button>{' '}
        </div>
    </div>
    );
}
 
export default Footer;