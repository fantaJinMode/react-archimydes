import React from "./node_modules/react";
// @material-ui/core components
import withStyles from "./node_modules/@material-ui/core/styles/withStyles";
import InputAdornment from "./node_modules/@material-ui/core/InputAdornment";
import Icon from "./node_modules/@material-ui/core/Icon";
// @material-ui/icons
import Email from "./node_modules/@material-ui/icons/Email";
// core components
import GridContainer from "./node_modules/components/Grid/GridContainer.jsx.js";
import GridItem from "./node_modules/components/Grid/GridItem.jsx.js";
import Button from "./node_modules/components/CustomButtons/Button.jsx.js";
import Card from "./node_modules/components/Card/Card.jsx.js";
import CardBody from "./node_modules/components/Card/CardBody.jsx.js";
import CardHeader from "./node_modules/components/Card/CardHeader.jsx.js";
import CustomInput from "./node_modules/components/CustomInput/CustomInput.jsx.js";
import PropTypes from './node_modules/prop-types';

import loginPageStyle from "./node_modules/assets/jss/material-kit-pro-react/views/loginPageStyle.jsx.js";

import image from "assets/img/bg7.jpg";
import SnackbarContent from "./node_modules/components/Snackbar/SnackbarContent.jsx.js";
import {connect} from "./node_modules/react-redux";
import NavigationBar from "./node_modules/components/inc/NavigationBar.jsx.js";
import { login } from "../../actions/login";

import styles from "./node_modules/assets/jss/customStyle.jsx.js";
import Footer from "./node_modules/components/Footer/Footer.jsx.js";
import { isLoggedIn, getUserData } from "../../utils/common";
import Clearfix from "../../components/Clearfix/Clearfix";
import LoadingComponent from "../../components/inc/LoadingComponent";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      isLoggedIn: false,
      erMessage: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    //Check if user already logged in
    if(isLoggedIn()){
      if(getUserData() && getUserData().userRoles && getUserData().userRoles.length && getUserData().userRoles.includes("Admin")){
        this.context.router.history.push('/admin/projects');
      }else{
        this.context.router.history.push('/');
      }
    }
  }

   handleSubmit() {
    this.setState({
      isLoading:true
    }, async () => {
      if(!this.state.emailError && !this.state.passwordError){
        const data = {
          'username': this.state.email,
          'password': this.state.password,
          'grant_type': 'password',
        }
        const response = await this.props.login(data);
        if(!(response && response.user)){
          this.setState({isLoading:false})
        } else if(response && response.user && response.user.deleted){
          this.setState({erMessage: "User doesn't exist"})
        } else {
          if(response && response.user && response.accessToken){
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("userData", JSON.stringify(response.user));
            localStorage.setItem('expireToken', response.accessTokenExpiresAt);
            this.setState({ isLoading: false})
            if(response.user.firstTimeUser){
              this.context.router.history.push('/profile-page');
            }else{
              if(response.user.userRoles && response.user.userRoles.length && response.user.userRoles.includes("Admin")){
                this.context.router.history.push('/admin/projects');
              }else{
                this.context.router.history.push('/');
              }
            }
          }
        }
        console.log(response);
      }
    })

  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  handleUserValidation = (event, type='email') => {
    if(type==='password'){
      if(!event.target.value){
        this.setState({ passwordError: true });
      }else{
        this.setState({ passwordError: false });
      }
    }else{
      if(!event.target.value){
        this.setState({ emailError: true });
      }else{
        const isValidEmail = event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(isValidEmail){
          this.setState({ emailError: false });
        }else{
          this.setState({ emailError: true });
        }
      }
    }
  };

  onClose = ()=>{
    this.setState({erMessage: ""})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={styles.removePadding}>
          <NavigationBar isLoggedIn={false} />
        </div>
        { this.state.erMessage ?
          <div>
          <SnackbarContent
            message={
              <span>
              <b>ERROR:</b> {this.state.erMessage}
            </span>
            }
            customNotificationClear={this.onClose}
            color="danger"
            close = {true}
            icon="info_outline"
          />
            <Clearfix />
          </div> : null
        }

        <div
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <form className={classes.form}>
                    <CardHeader
                      color="success"
                      login
                      className={classes.cardHeader}
                    >
                      <h4 className={classes.cardTitle}>Login</h4>
                    </CardHeader>
                    <CardBody signup>
                      <CustomInput
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Email...",
                          type: "email",
                          name: "email",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                          onChange: (event) => this.handleUserInput(event),
                          onBlur: (event) => this.handleUserValidation(event)
                        }}
                        value={this.state.email}
                        error={ this.state.emailError ? true : false }
                      />
                      <CustomInput
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Password",
                          type: "password",
                          name: "password",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon className={classes.inputIconsColor}>
                                lock_utline
                              </Icon>
                            </InputAdornment>
                          ),
                          onChange: (event) => this.handleUserInput(event),
                          onBlur: (event) => this.handleUserValidation(event, 'password')
                        }}
                        value={this.state.password}
                        error={ this.state.passwordError ? true : false }
                      />
                    </CardBody>
                    <div className={classes.textCenter}>
                      <LoadingComponent isLoading={this.state.isLoading}>
                      <Button simple color="success" size="lg" onClick={() => this.handleSubmit()}>
                        SIGN IN
                      </Button>
                      </LoadingComponent>
                    </div>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer
          theme="#e5e5e5"
          content={
            <div>
              <div className={classes.right}>
                A &copy;&nbsp;
                <a href="http://www.root-nyc.com">Root NYC</a>
                &nbsp;Product
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.login.auth
});

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data)),
});

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(LoginPage));
