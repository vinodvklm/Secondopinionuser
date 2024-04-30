import {NavigationActions} from 'react-navigation';

//clever function to get access to navigator
let navigator;

export const setNavigator=(nav)=>{
navigator=nav;
};


// navigate function for everyone else to use

export const navigate = (routeName,params)=>{

navigator.dispatch(
    NavigationActions.navigate({
        routeName:routeName,
        params:params
     })
   );

};