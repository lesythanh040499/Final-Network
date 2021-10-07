import { deleteDataAPI, postDataAPI, getDataAPI } from 'api/fetchData';
import { GLOBALTYPES } from './globalTypes';

export const NOTIFY_TYPES = {
  GET_NOTIFIES: 'GET_NOTIFIES',
  CREATE_NOTIFY: 'CREATE_NOTIFY',
  REMOVE_NOTIFY: 'REMOVE_NOTIFY'
};

export const createNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await postDataAPI('notify', msg, auth.token);

      socket.emit('createNotify', {
        ...res.data.notify,
        user: {
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
      });
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const removeNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);
      
      socket.emit('removeNotify', msg)
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
  };

export const getNotifies = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI('notifies', token);
    console.log(res);
    console.log(res.data.notifies);
    dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies });
  } catch (error) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
  }
};
