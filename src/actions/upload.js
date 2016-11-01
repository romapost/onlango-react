import {createAction} from 'redux-actions';

const uploadFileComplete = createAction('UPLOAD_FILE_COMPLETE');

const uploadFileChunk = createAction(
  'UPLOAD_FILE_CHUNK',
  chunk => chunk,
  (chunk, cb) => ({cb})
);

const uploadFile = createAction(
  'UPLOAD_FILE',
  ({name, type, size}) => ({name, type, size}),
  (file, cb) => {
    const {size} = file;
    return {
      dsp: dispatch => {
        let chunkSize = Math.ceil(size/100);
        if (chunkSize < 10240) chunkSize = 10240;
        else if (chunkSize > 1024000) chunkSize = 1024000;
        const reader = new FileReader();
        reader.onload = event => {
          dispatch(uploadFileChunk(event.target.result, sendChunk));
        };

        function sendChunk(offset) {
          console.log(offset, size);
          if (offset < size) {
            reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
          } else {
            dispatch(uploadFileComplete());
          }
        }

        return sendChunk;
      }
    };
  }
);

export {
  uploadFile,
  uploadFileChunk,
  uploadFileComplete,
};
