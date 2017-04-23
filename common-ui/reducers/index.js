import {combineReducers} from 'redux';
import PersonalInformation from './profile.js';




const allReducers = combineReducers({
  personal_info: PersonalInformation
});

export default allReducers
