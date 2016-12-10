import React from 'react';
import EditPOI from '../components/EditPOI';
import base from '../base';

class EditPOIContainer extends React.Component{

  state = {
    id: null,
    name: null,
    description: null,
    latitude: null,
    longitude: null,
    image: null
  }

  componentWillMount(){

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

  editPointofInterest(){
    const name = document.getElementById('name').value;
    alert(name);
  }

  render(){
    return (
      <div className="component-wrapper">
        <div className="wrapper">
          <EditPOI editPointofInterest={this.editPointofInterest} {...this.state}  />
        </div>
      </div>
    )
  }
}

EditPOIContainer.contextTypes = {
  location: React.PropTypes.object
}

export default EditPOIContainer;
