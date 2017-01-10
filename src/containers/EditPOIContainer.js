import React from 'react';
import { Link } from 'react-router';


import base from '../base';

class EditPOIContainer extends React.Component{

  constructor(props) {
   super(props);
   this.state = {
     id: '',
     name: '',
     description: '',
     latitude: '',
     longitude: '',
     image: ''
   }

   this.handleChange = this.handleChange.bind(this);
   this.editPointofInterest = this.editPointofInterest.bind(this);

 }

  componentWillMount() {

    const editID = this.context.location.query.editId;
    base.fetch(`/pointofinterest/${editID}`, {
      context: this,
      asArray: false,
      then(data){

        console.log(data);
        this.setState({
          id: editID,
          name: data.name,
          description: data.description,
          image: data.image,
          latitude: data.latitude,
          longitude: data.longitude,
        })

      }
    });
  }

  handleChange(event) {
   switch (event.target.name) {
     case 'name':
       this.setState({ name: event.target.value });
       break;
    case 'longitude':
       this.setState({ longitude: event.target.value })
       break;
    case 'latitude':
       this.setState({ latitude: event.target.value })
       break;
    case 'description':
        this.setState({ description: event.target.value })
        break;
     default:
   }

  }

  editPointofInterest(){

    let id = this.context.location.query.editId;


    const name = this.state.name;
    const latitude = this.state.latitude;
    const longitude = this.state.longitude;
    const description = this.state.description;

    document.getElementById('btnEditLocation').innerHTML = 'Saving...';
    const image = document.getElementById('image').files;
    if ( image.length > 0 ){

      const storageRef = base.storage().ref();
      let file = image[0];
      var metadata = {
        'contentType': file.type
      }

      const timestamp = Date.now();
      storageRef.child(`images/${timestamp}/${file.name}`).put(file,metadata).then(function(snapshot){

        const url = snapshot.metadata.downloadURLs[0];
        base.update(`pointofinterest/${id}`, {
          data: { name: name, image: url, latitude: latitude, longitude: longitude, description: description },
          then(err){
            if(!err){
                document.getElementById('btnEditLocation').innerHTML = 'Save';
                window.location.reload();
            }
          }
        })

      }).catch(function(error){
        document.getElementById('btnEditLocation').innerHTML = 'Save';
        console.log("Upload Failed: ", error);
      })

    } else {

      base.update(`pointofinterest/${id}`, {
        data: { name: this.state.name, latitude: this.state.latitude, longitude: this.state.longitude, description: this.state.description },
        then(err){
          if(!err){
              document.getElementById('btnEditLocation').innerHTML = 'Save';
          }
        }
      })

    }



  }

  render() {
    if (!this.props.uid){
      return (
        <div className="component-wrapper">
          <div className="wrapper">
            <div className="admin-panel admin-panel--no-border avenir">
              <h2 className="avenir">See you soon!</h2>
              <Link to="/" className="home-page__navbuttons--button avenir">Sign back in</Link>
            </div>
          </div>
        </div>
      )
    } else {

    return (
      <div className="component-wrapper">
        <div className="wrapper">
          <div className="admin-panel avenir">
            <div className="admin-panel__header">Edit Point of Interest</div>
            <div className="admin-panel__form">
              <div className="admin-panel__section">
                <label>Name</label>
                <input name="name" type="text" value={this.state.name} onChange={this.handleChange}   />
              </div>
            </div>
            <div className="admin-panel__form">
              <div className="admin-panel__section">
                <label>Latitude</label>
                <input name="latitude" type="text" value={this.state.latitude} onChange={this.handleChange}  />
              </div>
              <div className="admin-panel__section">
                <label>Longitude</label>
                <input name="longitude" type="text" value={this.state.longitude} onChange={this.handleChange}  />
              </div>
            </div>
            <div className="admin-panel__form">
              <div className="admin-panel__section">
                <label>Short Description</label>
                <textarea name="description" type="text" value={this.state.description} onChange={this.handleChange}  />
              </div>
            </div>
            <div className="admin-panel__form">
              <div className="admin-panel__section">
                <label>Image</label>
                <img alt="edit" className="edit-img" src={this.state.image}/>
              </div>
            </div>
            <div className="admin-panel__form">
              <div className="admin-panel__section">
                <input id="image" type="file" />
              </div>
            </div>
            <div className="admin-panel__form">
              <div className="admin-panel__section admin-panel__section--center">
                <button id="btnEditLocation" onClick={this.editPointofInterest} className="home-page__navbuttons--button admin-panel__button avenir">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  }
}

EditPOIContainer.contextTypes = {
  location: React.PropTypes.object
}

export default EditPOIContainer;
