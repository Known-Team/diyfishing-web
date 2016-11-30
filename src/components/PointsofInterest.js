import React from 'react';
import base from '../base';
import { BrowserRouter, Match, Miss, Redirect } from 'react-router';


class db extends React.Component{

  state={
    locations: {}
  }

  componentWillMount(){
    this.ref = base.syncState(`places/`,{
      context:this,
      state:'locations'
    })
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addLocation(){

    document.getElementById('btnAddLocation').innerHTML = 'Saving...';
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').files;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const description = document.getElementById('description').value;

    const storageRef = base.storage().ref();
    let file = image[0];
    var metadata = {
      'contentType': file.type
    }

    storageRef.child(`images/${file.name}`).put(file,metadata).then(function(snapshot){

      const url = snapshot.metadata.downloadURLs[0];
      base.post(`places/${name}`, {
        data: { name: name, image: url, latitude: latitude, longitude: longitude, description:description },
        then(err){
          if(!err){
              document.getElementById('btnAddLocation').innerHTML = 'Add Location';
              document.getElementById('name').value = null;
              document.getElementById('image').value = null;
              document.getElementById('latitude').value = null;
              document.getElementById('longitude').value = null;
              document.getElementById('description').value = null;
          }
        }
      })

    }).catch(function(error){
      console.log("Upload Failed: ", error);
    })

  } // end addLocation


  updateLocation(place){
    base.update(`places/${place}`,{
      data: { new_field: 'Hey Im new!' },
      then(err){
        if(!err){
          alert("place updated!");
        }
      }
    })
  }

  getLocationData(location) {
    base.fetch(`places/${location}`, {
      context: this,
      asArray:true
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.log("there was an error", error);
    })
  }

  getAllLocations() {
    fetch('https://mobelux.apispark.net/v1/places', {
    	method: 'get'
    }).then(function(response) {
    	return response.json()
    }).then(function(j) {
      console.log(j);
      this.doSomethingWithData(j)
    }.bind(this));
  }

  doSomethingWithData(d){
      d.map(function(key,index){
        console.log(key.capitol);
        if (key.image === null){
          key.image = "http://placehold.it/100x100";
        }
        document.getElementById("demo").innerHTML += "<img style='height:100px;width:100px' src="+ key.image +" />";
      })
  }

  removeLocation = (key) => {
    const locations = {...this.state.locations}
    //have to set null since were hooked to firebase, other wise would just delete fishes[key]
    locations[key] = null;
    this.setState({ locations })

  }

  renderLocations = (key) => {
    const location = this.state.locations[key];
    return (
      <div className="locations-block" key={key}>
        <div className="locations-block__image">
          <img className="br-100 dib locationImage" src={location.image}/>
        </div>
        <div className="locations-block__name">{location.name}</div>
        <div onClick={() => this.removeLocation(key)} className="locations-block__actions">&times;</div>
      </div>
    )
  }

  render(){
    if (!this.props.uid){
      console.log("im logged in");
      return (
          <Redirect to={'/'} />

        )
    }


    return(
      <div>
        <div className="admin-panel avenir">
          <div className="admin-panel__header">Add Location</div>
          <div className="admin-panel__form">
            <div className="admin-panel__section">
              <label>Name</label>
              <input id="name" type="text" />
            </div>
            <div className="admin-panel__section">
              <label>Image</label>
              <input id="image" type="file" />
            </div>
          </div>
          <div className="admin-panel__form">
            <div className="admin-panel__section">
              <label>Latitude</label>
              <input id="latitude" type="text" />
            </div>
            <div className="admin-panel__section">
              <label>Longitude</label>
              <input id="longitude" type="text" />
            </div>
          </div>
          <div className="admin-panel__form">
            <div className="admin-panel__section">
              <label>Short Description</label>
              <input id="description" type="text" />
            </div>
          </div>
          <div className="admin-panel__form">
            <div className="admin-panel__section admin-panel__section--center">
              <button id="btnAddLocation" onClick={()=> this.addLocation()} className="home-page__navbuttons--button admin-panel__button avenir">Add Location</button>
            </div>
          </div>
        </div>
        <div className="admin-panel avenir">
          <div className="admin-panel__header">Locations Added</div>
          <div className="admin-panel__form">
            <div className="admin-panel__section admin-panel__section--location">
              {Object.keys(this.state.locations).map(this.renderLocations)}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default db
