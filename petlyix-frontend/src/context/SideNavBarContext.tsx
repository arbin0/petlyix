import React from 'react';

const SideNavContext = React.createContext(false);

export default SideNavContext;

//Contexts are used to pass value between components without using props.
// Here Context is used inside the sidenav, so whenever the sidenav renders it passes true to the context and header nav 
// will use that context to render the logo. So if sidebar is rendered the logo in header will not render
