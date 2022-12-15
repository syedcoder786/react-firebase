import React,{ Component } from 'react';
import firebase from './components/firebase'

export class App extends Component {
  state = {
    files:null,
    loading:false,
  }

  onChange = (e) => {
    this.setState({files:e.target.files})
  }

  handleSave = () => {
    let bucketName = 'images';
    let file = this.state.files[0];
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
    let uploadTask = storageRef.put(file)
    uploadTask.on('state_changed', (snapshot) => {
      console.log("Image Upload Progress")
      this.setState({loading:true})
      },
      (error) => {
          console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        console.log(downloadURL)
        this.setState({loading:false})
        }).then(asd=>{
          console.log(asd)
        })
      }
    )
    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //   ()=>{
    //     // let downloadURL = 
    //     uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
    //       console.log(downloadURL)
    //     })
    //   })
  }
  showImage = () => {
    let storageRef = firebase.storage().ref()
    let spaceRef = storageRef.child('images/'+this.state.files[0].name)
    spaceRef.getDownloadURL().then((url) => {
        console.log(url)
        document.getElementById('new-img').src= url
    })
  }

  render(){
    return (
      <div className="App">
        <h1>hii</h1>
        <input type="file" onChange={this.onChange}/>
        <button onClick={this.handleSave}>Save file</button>
        <button onClick={this.showImage}>Show Image</button>
        <br/>
        {this.state.loading?<p>Uploading Image...</p>:''}
        <br/>
        <img id="new-img" alt=""/>
      </div>
    );
  }
}

export default App
