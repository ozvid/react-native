/**
 * @typedef ASYNC_ACTION_TYPE
 * @property {string} REQUEST
 * @property {string} SUCCESS
 * @property {string} FAILURE
 */

export const createAsyncActionTypes = baseType => {
  return {
    REQUEST: baseType,
    SUCCESS: `${baseType}_SUCCESS`,
    FAILURE: `${baseType}_FAILURE`
  };
};

export function action(type, payload = {}) {
  return { type, payload };
}

export function createAsyncAction(actionType) {
  const asyncActionType = createAsyncActionTypes(actionType);
  return {
    success: response => action(asyncActionType.SUCCESS, response),
    failure: err => action(asyncActionType.FAILURE, err)
  };
}
