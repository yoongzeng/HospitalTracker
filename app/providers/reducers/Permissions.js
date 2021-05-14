import { actions } from '../actions/Permissions';

const initialState = {
  locationPermission: false,
  notificationPermission: false,
};

export default function permissionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.LOCATION_PERMISSION:
      return {
        ...state,
        locationPermission: action.payload,
      };

    case actions.PUT.NOTIFICATIONS_PERMISSION:
      return {
        ...state,
        notificationPermission: action.payload,
      };

    default:
      return state;
  }
}
