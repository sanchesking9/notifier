import React, { Component } from 'react';
import Cropper from 'react-cropper';

const src = 'http://fengyuanchen.github.io/cropper/img/picture.jpg';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
    };
    this._cropImage = this._cropImage.bind(this);
    this._onChange = this._onChange.bind(this);
    this._useDefaultImage = this._useDefaultImage.bind(this);
  }

  _cropImage() {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.refs.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  _rotateImage(right) {
    this.refs.cropper.rotate(right ? 45 : -45);
  }

  _onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  _useDefaultImage() {
    this.setState({ src });
    this._cropImage();
  }

  render() {
    return (
      <div>
        <div style={{ width: '100%' }}>
          <input type="file" onChange={this._onChange} />
          <button onClick={this._useDefaultImage}>Use default img</button>
          <button onClick={this._rotateImage.bind(this, true)}>Rotate right</button>
          <button onClick={this._rotateImage.bind(this, false)}>Rotate left</button>
          
          <br />
          <br />
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 9}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref="cropper"
            crop={this._crop}
          />
        </div>
        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>Preview</h1>
            <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
          </div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1 style={{ display: 'inline-block' }}>
              Crop
              <button onClick={ this._cropImage } style={{ float: 'right' }}>
                Crop Image
              </button>
            </h1>
            <img style={{ width: '100%' }} src={this.state.cropResult} />
          </div>
        </div>
        <br style={{ clear: 'both' }} />
      </div>
    );
  }
}