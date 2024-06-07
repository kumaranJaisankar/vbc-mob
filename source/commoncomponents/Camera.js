import ImagePicker from 'react-native-image-crop-picker';
import PhotoEditor from 'react-native-photo-editor';
import {Platform, View} from 'react-native';

const Camera = {
  openCameraPanel,
  openCamera,
  openGallery,
};

async function openCameraPanel(status, successCallback, errorCallBack) {
  ImagePicker.openCamera({
    width: 800,
    height: 1000,
    includeBase64: true,
    mediaType: 'photo',
    cropping: true,
  })
    .then(image => {
      var imageresponse = {
        picStatus: status,
        imageData: image,
      };
      successCallback(imageresponse);
    })
    .catch(_error => {
      var imageresponse = {
        picStatus: status,
        imageData: _error,
      };
      errorCallBack(imageresponse);
    });
}

async function openCamera(successCallback, errorCallBack) {
  ImagePicker.openCamera({
    width: 800,
    height: 1000,
    includeBase64: true,
    mediaType: 'photo',
    cropping: true,
  })
    .then(image => {
      PhotoEditor.Edit({
        path: image.path.replace('file://', ''),
        hiddenControls: ['share', 'sticker', 'save'],
        onDone: () => {
          successCallback(image);
        },
      });
    })
    .catch(_error => {
      errorCallBack(_error);
    });
}

async function openGallery(status, successCallback, errorCallBack) {
  ImagePicker.openPicker({
    width: 800,
    height: 1000,
    includeBase64: true,
    mediaType: 'photo',
    cropping: true,
  })
    .then(image => {
      var imageresponse = {
        picStatus: status,
        imageData: image,
      };
      PhotoEditor.Edit({
        path: image.path.replace('file://', ''),
        hiddenControls: ['share', 'sticker', 'save'],
        onDone: () => {
          successCallback(imageresponse);
        },
      });
    })
    .catch(_error => {
      errorCallBack(_error);
    });
}

export default Camera;
