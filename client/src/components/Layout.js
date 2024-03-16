import React from 'react';
import Nav from './components/Nav';


const layout = (props) => (
<div>
    <Nav />
    {props.children}
</div>
);

export default layout;