import React from 'react';
import FishingInfo from '../components/Fishing';
import base from '../base';


class FishingContainer extends React.Component{

  state={
    fishinginfo: {}
  }

  componentWillMount(){
    this.ref = base.syncState(`fishinginfo/`,{
      context:this,
      state:'fishinginfo'
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

    const timestamp = Date.now();

    storageRef.child(`images/${timestamp}/${file.name}`).put(file,metadata).then(function(snapshot){

      const url = snapshot.metadata.downloadURLs[0];
      base.post(`fishinginfo/fo-${timestamp}`, {
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

  } // end addPointofInterest

  removeLocation = (key) => {

    var c = confirm("Are you sure you want to delete fishing info? Once deleted, this cannot be undone.");
    if (c === false) {
        return;
    }

    const fishinginfo = {...this.state.fishinginfo}
    //have to set null since were hooked to firebase, other wise would just delete fishes[key]
    fishinginfo[key] = null;
    this.setState({ fishinginfo })

  }

  handlePOIChange = (e,key) => {
    const fishinginfo = this.state.fishinginfo[key];
   console.log(fishinginfo);
    const updatedfo = {
      ...fishinginfo,
      [e.target.name]: e.target.value
      }
    this.updatePOI(key,updatedfo);
}

updatePOI = (key,updatedfo) =>{
  const fo = {...this.state.fishinginfo}
  fo[key] = updatedfo;
  this.setState({ fishinginfo: fo });
};

  renderLocations = (key) => {
    const location = this.state.fishinginfo[key];
    return (
      <div className="locations-block" key={key}>

        <div className="locations-block__info">

          <div className="locations-block__info__prop">
            <img src={location.image} />
          </div>

          <div className="locations-block__info__prop">
            <div className="locations-block__info__prop--label">Name</div>
            <div className="locations-block__info__prop--value">{location.name}</div>
          </div>


          <div className="locations-block__info__prop">
            <div className="locations-block__info__prop--label">Description</div>
            <div className="locations-block__info__prop--value">{location.description.substring(0,50) + '...'}</div>
          </div>


        </div>
        <div className="locations-block__actions">
          <div><a className="dropdown__item avenir" href={`/edit-fishing?editId=${key}`}>Edit</a></div>
          <div className="locations-block__actions--delete" onClick={() => this.removeLocation(key)}>&times;</div>
          
        </div>

      </div>
    )
  }

  render(){
    return(
      <div>
        <FishingInfo addPointofInterest={this.addPointofInterest}  {...this.state} />
        <div className="admin-panel avenir">
          <div className="admin-panel__header">Fishing Info Added</div>
          <div className="admin-panel__form">
            <div className="admin-panel__section admin-panel__section--location">
              {Object.keys(this.state.fishinginfo).map(this.renderLocations)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FishingContainer;
