import React from 'react';

function EmbeddedMap(props){
    return(
        <iframe title="location map" src={props.url} height="450"  style={{border:"solid 1px #43a82c", width:"100%"}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
    );
}

export default EmbeddedMap;