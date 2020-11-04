import React from 'react';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors.js';
import {setCurrentUser} from './redux/user/user.actions.js';
import HomePage from './pages/homepage-component.jsx';
import {Route,Switch,Redirect} from 'react-router-dom';
import './App.css';
import CheckoutPage from './pages/checkout/checkout.component.jsx'; 
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header. component.jsx';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import SigninAndSignupPage from './pages/sign-in-page/sign-in-up.component.jsx';
import {connect} from 'react-redux';

class App extends React.Component {
 
  unsubscribeFromAuth=null
  componentDidMount(){

    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot(Snapshot=>{
      setCurrentUser({
    
          id: Snapshot.id,
          ...Snapshot.data()
        
      });
      });
      }  
      setCurrentUser(userAuth);
    });
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
  return (
    <div >
       <Header />
      <Switch>
       
        
       <Route exact path='/' component={HomePage}/>
        <Route  path='/shop' component={ShopPage}/>
        <Route  exact path='/checkout' component={CheckoutPage}/>
        <Route  
        exact 
        path='/signin' 
        render={()=> this.props.currentUser? (
          <Redirect to='/' />
          ) : (
            <SigninAndSignupPage />
          )
        } />
        
      </Switch>
    
    </div>
  );
}
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch =>({
setCurrentUser:user => dispatch( setCurrentUser(user))
});
export default  connect(mapStateToProps,mapDispatchToProps)(App);
