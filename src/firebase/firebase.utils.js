import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCGU0O5IFd8tX06VlU5Eh52hBEN-3pgp6w",
  authDomain: "crown-db-910f5.firebaseapp.com",
  databaseURL: "https://crown-db-910f5.firebaseio.com",
  projectId: "crown-db-910f5",
  storageBucket: "crown-db-910f5.appspot.com",
  messagingSenderId: "855074196009",
  appId: "1:855074196009:web:49ec08212b081dbae16a38",
  measurementId: "G-4GY644P7F3"
    
  };
  export const createUserProfileDocument = async(userAuth,additionalData) =>{
    if(!userAuth) return;

    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot=await userRef.get();
    console.log(snapShot);
    if(!snapShot.exists){
      const { displayName, email} = userAuth;
      const createdAt= new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch(error){
        console.log('error creating user',error.message);
      }
    }
    return userRef;
  }


  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore=firebase.firestore();


  const provider =new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account'});

  export const signInWithGoogle = () =>auth.signInWithPopup(provider);
  export default firebase;