import React from 'react';

class EditPOI extends React.Component{

  componentDidMount(){
    //const s = document.getElementById('name').value;
    

  }

  render(){
    return(
      <div>
        <div className="admin-panel avenir">
          <div className="admin-panel__header">Edit New Point of Interest</div>
          <div className="admin-panel__form">
            <div className="admin-panel__section">
              <label>Name</label>
              <input  id="name" type="text"  />
            </div>
          </div>
          <div className="admin-panel__form">
            <div className="admin-panel__section">
              <label>Latitude</label>
              <input id="latitude" type="text" value={this.props.latitude} />
            </div>
            <div className="admin-panel__section">
              <label>Longitude</label>
              <input id="longitude" type="text" value={this.props.longitude} />
            </div>
          </div>
          <div className="admin-panel__form">
            <div className="admin-panel__section">
              <label>Short Description</label>
              <textarea id="description" type="text" value={this.props.description} />
            </div>
          </div>
          <div className="admin-panel__form">
            <div className="admin-panel__section">
              <label>Image</label>
              <img className="edit-img" src={this.props.image}/>
            </div>

          </div>
          <div className="admin-panel__form">
            <div className="admin-panel__section">
              <input id="image" type="file" />
            </div>
          </div>
          <div className="admin-panel__form">
            <div className="admin-panel__section admin-panel__section--center">
              <button id="btnEditLocation" onClick={()=> this.props.editPointofInterest()} className="home-page__navbuttons--button admin-panel__button avenir">Save</button>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default EditPOI;
