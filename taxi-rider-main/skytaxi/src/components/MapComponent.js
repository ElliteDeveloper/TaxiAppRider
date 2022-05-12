import React, { Component } from "react";
import { Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, MarkerAnimated } from "react-native-maps";

export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      mapRegion,
      markerCord,
      mapStyle,
      nearby,
      onRegionChange,
      markerRef,
    } = this.props;
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followUserLocation
        loadingEnabled
        showsMyLocationButton={true}
        style={[mapStyle, { marginBottom: this.state.marginBottom }]}
        region={mapRegion}
        onRegionChange={onRegionChange}
        onMapReady={() => this.setState({ marginBottom: 1 })}
      >
        <MarkerAnimated
          ref={markerRef}
          coordinate={{
            latitude: markerCord.droplatitude
              ? markerCord.droplatitude
              : markerCord.wherelatitude,
            longitude: markerCord.droplongitude
              ? markerCord.droplongitude
              : markerCord.wherelongitude,
          }}
          // image={require('../../assets/images/rsz_2red_pin.png')}
          draggable={true}
          //coordinate={this.state.x}
          onDragEnd={(e) => {
            console.log("dragEnd", e.nativeEvent.coordinate);
          }}
        >
          <Image
            source={require("../../assets/images/rsz_2red_pin.png")}
            style={{ height: 35, width: 35 }}
          />
        </MarkerAnimated>
        {nearby
          ? nearby.map((item, index) => {
              return (
                <MarkerAnimated
                  coordinate={{
                    latitude: item.location ? item.location.lat : 0.0,
                    longitude: item.location ? item.location.lng : 0.0,
                  }}
                  key={index}
                  //   image={require("../../assets/images/available_car.png")}
                >
                  <Image
                    source={require("../../assets/images/available_car.png")}
                    style={{ height: 35, width: 35 }}
                  />
                </MarkerAnimated>
              );
            })
          : null}
      </MapView>
    );
  }
}
