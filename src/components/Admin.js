import React from 'react';
import base from '../base';
import { Redirect } from 'react-router';

import PointsofInterest from './PointsofInterest';




class Admin extends React.Component{

  state={
    pointsofinterest: {}
  }

  componentWillMount(){
    this.ref = base.syncState(`pointofinterest/`,{
      context:this,
      state:'pointsofinterest'
    })
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addPointofInterest(){

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
      base.post(`pointofinterest/${name}`, {
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
    base.update(`pointsofinterest/${place}`,{
      data: { new_field: 'Hey Im new!' },
      then(err){
        if(!err){
          alert("place updated!");
        }
      }
    })
  }

  getLocationData(location) {
    base.fetch(`pointsofinterest/${location}`, {
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
    const pointsofinterest = {...this.state.pointsofinterest}
    //have to set null since were hooked to firebase, other wise would just delete fishes[key]
    pointsofinterest[key] = null;
    this.setState({ pointsofinterest })

  }

  renderLocations = (key) => {
    const location = this.state.pointsofinterest[key];
    return (
      <div className="locations-block" key={key}>
        <div className="locations-block__image">
          <img className="h3 w3 dib locationImage" src={location.image} alt="location"/>
        </div>
        <div className="locations-block__info">
        <div><input type="text" value={location.name} /></div>
        <div><input type="text" value={location.latitude} /></div>
        <div><input type="text" value={location.longitude} /></div>
      <div><textarea type="text" value={location.description} /></div>
        </div>
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
        <PointsofInterest addPointofInterest={this.addPointofInterest}  {...this.state} />
        <div className="admin-panel avenir">
          <div className="admin-panel__header">Points of Interest Added</div>
          <div className="admin-panel__form">
            <div className="admin-panel__section admin-panel__section--location">
              {Object.keys(this.state.pointsofinterest).map(this.renderLocations)}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Admin
