import { actions } from '../actions/User';

const initialState = {
  name: '',
  location: null,
  email: '',
  //mobile: '',
  age: '',
  uuid: '',
  //profilePicture: null,
  //token: '',
  userChats: [],
  allChats: null,
  isLoading: false,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.PUT.USER_PROFILE: {
      const {
        uuid,
        name,
        email,
        age,
        //mobile,
        //profile_picture,
        //location,
        //token,
      } = action.payload;
      return {
        ...state,
        uuid,
        name,
        email,
        age,
        //mobile,
        //location,
        //token,
      };
    }

    case actions.PUT.USER_PROFILE_PICTURE: {
      const profile_picture = action.payload;
      return {
        ...state,
        profilePicture: {
          imageName: profile_picture.image_name,
          imageUri: profile_picture.image_url,
        },
      };
    }

    case actions.PUT.USERNAME:
      return {
        ...state,
        username: action.payload,
      };

    case actions.PUT.USER_MOBILE:
      return {
        ...state,
        mobile: action.payload,
      };

    case actions.PUT.USER_LOCATION: {
      const userLocation = action.payload;
      return {
        ...state,
        location: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }
      };
    }

    case actions.PUT.USER_CHATS:
      return {
        ...state,
        userChats: action.payload,
      };

    case actions.PUT.USER_AGE:
    return {
      ...state,
      age: action.payload,
    };

    case actions.PUT.CHATS:
      return {
        ...state,
        allChats: action.payload,
      };

    case actions.PUT.LOADING_STATUS:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
}
