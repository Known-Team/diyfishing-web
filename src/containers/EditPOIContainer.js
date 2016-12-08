import React from 'react';
import EditPOI from '../components/EditPOI';
import base from '../base';

class EditPOIContainer extends React.Component{

  componentWillMount(){
    const editID = this.context.location.query.editId;
    base.fetch(`/pointofinterest/${editID}`, {
      context: this,
      asArray: false,
      then(data){
        console.log(data);
      }
    });
  }

  render(){
    return (
      <div className="app-container">
        <div>
          <EditPOI  />
        </div>
      </div>
    )
  }
}

EditPOIContainer.contextTypes = {
  location: React.PropTypes.object
}

export default EditPOIContainer;
