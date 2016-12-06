import React from 'react';

class PointsofInterest extends React.Component{

  render(){
    return(
      <div className="admin-panel avenir">
        <div className="admin-panel__header">Add New Point of Interest</div>
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
            <textarea id="description" type="text" />
          </div>
        </div>
        <div className="admin-panel__form">
          <div className="admin-panel__section admin-panel__section--center">
            <button id="btnAddLocation" onClick={()=> this.props.addPointofInterest()} className="home-page__navbuttons--button admin-panel__button avenir">Add Location</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PointsofInterest
