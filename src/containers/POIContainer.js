import React from 'react';
import { Redirect } from 'react-router';
import PointofInterest from '../components/PointsofInterest';
import base from '../base';

class POIContainer extends React.Component{

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


    const timestamp = Date.now();

    const storageRef = base.storage().ref();


    if ( image.length > 0 ) {

      let file = image[0];
      var metadata = {
        'contentType': file.type
      }

      storageRef.child(`images/${timestamp}/${file.name}`).put(file,metadata).then(function(snapshot){

        const url = snapshot.metadata.downloadURLs[0];
        base.post(`pointofinterest/poi-${timestamp}`, {
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

    } else {
      var placeholderURL = "https://firebasestorage.googleapis.com/v0/b/diyfishing-504c2.appspot.com/o/nsf27dnsca0-carl-heyerdahl.jpg?alt=media&token=da13130a-82b8-44d0-9842-dca48287e6a8";
      base.post(`pointofinterest/poi-${timestamp}`, {
        data: { name: name, image: placeholderURL, latitude: latitude, longitude: longitude, description:description },
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
    }






  } // end addPointofInterest

  removeLocation = (key) => {

    var c = confirm("Are you sure you want to delete this point of interest? Once deleted, this cannot be undone.");
    if (c === false) {
        return;
    }

    const pointsofinterest = {...this.state.pointsofinterest}
    //have to set null since were hooked to firebase, other wise would just delete fishes[key]
    pointsofinterest[key] = null;
    this.setState({ pointsofinterest })

  }

  handlePOIChange = (e,key) => {
    const pointofinterest = this.state.pointsofinterest[key];
   console.log(pointofinterest);
    const updatedPOI = {
      ...pointofinterest,
      [e.target.name]: e.target.value
      }
    this.updatePOI(key,updatedPOI);
}

updatePOI = (key,updatedPOI) =>{
  const poi = {...this.state.pointsofinterest}
  poi[key] = updatedPOI;
  this.setState({ pointsofinterest: poi });
};

  renderLocations = (key) => {
    const location = this.state.pointsofinterest[key];
    return (
      <div className="locations-block" key={key}>

        <div className="locations-block__info">

          <div className="locations-block__info__prop">
            <img alt="img" src={location.image} />
          </div>

          <div className="locations-block__info__prop">
            <div className="locations-block__info__prop--label">Name</div>
            <div className="locations-block__info__prop--value">{location.name}</div>
          </div>


          <div className="locations-block__info__prop">
            <div className="locations-block__info__prop--label">Description</div>
            <div className="locations-block__info__prop--value">{`${location.description.substring(0,50)}...`}</div>
          </div>


        </div>
        <div className="locations-block__actions">
          <div><a className="dropdown__item avenir" href={`/edit-poi?editId=${key}`}>Edit</a></div>
          <div className="locations-block__actions--delete" onClick={() => this.removeLocation(key)}>&times;</div>

        </div>

      </div>
    )
  }

  render(){

    if ( !this.props.uid ) {
      return (
          <Redirect to={'/'} />
      )
    } else {
      return(
        <div className="component-wrapper">
          <PointofInterest addPointofInterest={this.addPointofInterest}  {...this.state} />
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
}

export default POIContainer;
