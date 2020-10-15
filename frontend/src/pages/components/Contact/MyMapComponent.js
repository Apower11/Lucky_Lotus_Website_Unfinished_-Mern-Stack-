import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) => 
    <GoogleMap
                zoom={12}
                center={{ lat: 41.585919, lng: -93.653999 }}
                options={{streetViewControl: false}}>
                    <Marker onClick={props.onClick} position={{ lat: 41.585919, lng: -93.653999 }}
                    labelStyle={{ background: '#fff' }}
                    >
                        {props.isOpen && <InfoWindow onCloseClick={props.onClick}>
                            <React.Fragment>
                            <h3 style={{ textAlign: 'center' }}>Lucky Lotus</h3>
                            <span >2721 Ingersoll Ave, Des Moines, IA 50312, United States</span>
                            </React.Fragment>
                            </InfoWindow> }
                    </Marker>
                </GoogleMap>))

export default MyMapComponent;