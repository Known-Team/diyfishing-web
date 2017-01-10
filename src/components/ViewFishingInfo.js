import React from 'react';
import base from '../base';

class ViewFishingInfo extends React.Component{

  // www.site.com/view-info?id=fo-1481756904466

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
 }

  componentDidMount() {

    // commented code below is just to test the api.
    // ...

    //   fetch('https://diyfishing.apispark.net/v1/fishing_infos/')
    // .then(function(response) {
    //   return response.json();
    // }).then(function(d){
    //   console.log(d);
    // })

    const editID = this.context.location.query.id;
    base.fetch(`/fishinginfo/${editID}`, {
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

        let desc = this.state.description;
        desc = desc.replace(/\n/g,"<br />");
        document.getElementById('info-body').innerHTML = desc;

      }
    });
  }



  render(){



    return(
      <div className="view-page pa3">
        <h1 className="avenir">{this.state.name}</h1>
        <hr />
        <img alt="img" src={this.state.image} />
        <div id="info-body" className="view-page__body avenir"></div>
      </div>
    )
  }
}

ViewFishingInfo.contextTypes = {
  location: React.PropTypes.object
}

export default ViewFishingInfo;
