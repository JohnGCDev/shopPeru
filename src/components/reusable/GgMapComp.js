import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

//const apiKey = 'AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik';
const apiKey = '';
//const apiKey = 'AIzaSyCw1Cu5QmZqsFLWq-D7m12E3Qqjjj13xWY';

//usage: <GgMap lat={props.data.location.latitude} lng={props.data.location.longitude}/>
function GgMap(props){
    let coord = {lat: props.lat, lng: props.lng};
    let mapStyles = {width: "100%", height: "100%"};
    return(
        <Map 
            google={props.google} 
            zoom={15} 
            style={mapStyles}
            initialCenter={coord}
        />

    );
}

export default GoogleApiWrapper({apiKey})(GgMap);