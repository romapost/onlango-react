import {handleActions} from 'redux-actions';
import {uploadFile, uploadFileChunk, uploadFileComplete} from 'actions';

export default handleActions({
  [uploadFile]: (state, {payload}) => payload,
  [uploadFileChunk]: (state, {payload}) => payload,
  [uploadFileComplete]: () => null,
}, null);
