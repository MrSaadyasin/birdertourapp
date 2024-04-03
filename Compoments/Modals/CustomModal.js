import React, { useEffect, useRef, useState, useTransition } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import style from "./CustomModal.module.css";
import TextInput from "../TextInput";
import hideEyeIcon from "../../assets/images/Hide.png";
import eyeIcon from "../../assets/images/Hide-2.png";
import {authForgetPassword, authRole, authUserLogin, authUserRegister} from "../../Redux/auth/action";
import {connect} from "react-redux";
import Router from "next/router";
import {setCookies} from "cookies-next";
import {baseUrl} from "../../constants/baseurl.constants";
import {toast} from 'react-toastify';
import {Toaster} from "../../extras/constants";
import { Checkbox, Spin } from "antd";
import { GoogleIcons } from "../icons";
import { useTranslation } from "react-i18next";
const CustomModal = ({
  loginModal,
  setLoginModal,
  roleModal,
  setRoleModal,
  ...props
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  const agreeRef = useRef(null)
  const [termsModal, setTermsModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [aggree, setAggree] = useState(false)
  const [terms, setTerms] = useState(false)
  const [loading , setLoading] = useState({
    login : false,
    signup : false,
    forget : false
  })
  const handleCloseLogin = () => setLoginModal(false);
  const handleCloseSignup = () => setSignupModal(false);
  const handleCloseSignupAs = () => setRoleModal(false);
  const handleCloseForgot = () => setForgotModal(false);
  const handleCloseTerms = () =>{
    setSignupModal(true)
    setTermsModal(false)
    };
  const handleOpenTerms = () =>{ 
    setSignupModal(false)
    setTermsModal(true)
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);


  const login = async (data) => {
    try {
      setLoading({
        ...loading,
        login: true
      });
      const getUserLogin = await props?.dispatch(authUserLogin(data));
      if (getUserLogin.payload?.status === 200) {
        setCookies("access_token", getUserLogin.payload?.data?.token, {maxAge : 60 * 60 * 24 * 6});
        setLoading({
          ...loading,
          login: false
        });
        handleCloseLogin();
        toast.success("Login Successfully", Toaster);
      }else{
        setLoading({
          ...loading,
          login: false
        });
        if(getUserLogin.payload?.response?.data?.message){
         return toast.error(getUserLogin.payload?.response?.data?.message, Toaster);
        }else{
         return  toast.error(getUserLogin.payload?.message, Toaster);
        }

      }
    }catch (error){
      setLoading({
        ...loading,
        login: false
      });
      console.log("error", error);
    }
  };
  const Signup = async (data) => {
    try{
      if(aggree){ 
      setLoading({
        ...loading,
        signup: true
      });
    
        const getRegisterUser = await props?.dispatch(authUserRegister({...data, role : props?.userAuthReducer?.role}))  ;
      if(getRegisterUser.payload?.status === 200){
        toast.success(getRegisterUser.payload?.data?.message, Toaster);
        handleCloseSignup();
        setLoading({
          ...loading,
          signup: false
        });
      }else{
        setLoading({
          ...loading,
          signup: false
        });
        if(getRegisterUser.payload?.response?.data?.message) return toast.error(getRegisterUser.payload?.response?.data?.message, Toaster);
        return toast.error(getRegisterUser.payload?.message, Toaster);
      }}else{
        toast.error("Agree with terms")
        // agreeRef.current.input.style.border = '10px solid red !important';
        // agreeRef.current.input.style.acces = 'red';
        // console.log('agreeRef.current', agreeRef.current.input.style.background)
        // document.getElementsByClassName('ant-checkbox-inner').style.backgroundColor ='red'
      }
    }catch (error) {
      setLoading({
        ...loading,
        signup: false
      });
      console.log("error",error);
    }
  };


  const SendEmail = async (value) => {
    delete  value.password;
    setLoading({
      ...loading,
      forget: true
    });
    const getForgetPassword  = await props?.dispatch(authForgetPassword(value));
    if(getForgetPassword.payload?.status === 200){
      toast.success(getForgetPassword.payload?.data?.message, Toaster);
      setLoading({
        ...loading,
        forget: false
      });
      handleCloseForgot()
      return ;
    }else{
      setLoading({
        ...loading,
        forget: false
      });
      if (getForgetPassword.payload?.response?.data?.message) return  toast.error(getForgetPassword.payload?.response?.data?.message, Toaster);
      return toast.error(getForgetPassword.payload.message);
    }
  };

  const handleGoogleRedirect =  (e) => {
    e.preventDefault();
    Router.push(`${baseUrl}/auth/google`);
  }

  const handleFaceBookRedirect = (e) => {
    e.preventDefault();
    Router.push(`${baseUrl}/auth/facebook`);
  }

  return (
    <>
      {/*FORGET MODEL*/}
        <Modal show={forgotModal} onHide={handleCloseForgot} centered>
          <Modal.Header closeButton className="border-0"></Modal.Header>
          <Modal.Body className={style.modal__body}>
            <h2 className="mb-3">Reset Password</h2>
            <p className="mb-4">
              To regain access to your account, please enter your email address
              below:
            </p>
            {/*<form onSubmit={handleSubmit(SendEmail)}>*/}
              <div className="form-group mb-3">
                <TextInput
                    name={"email"}
                    className="form-control form-control-login "
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value:
                            /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/,
                        message: "Invalid email address",
                      },
                    }}
                    control={control}
                    placeholder="Email"
                />
              </div>
            {loading.forget ? <div className="w-100">
              <button
                className="btnPrimary w-100"
                type="submit"
              >
                <Spin /> &nbsp;
                loading...
              </button>
            </div>
             :
              <button
                onClick={handleSubmit(SendEmail)}
                className="btnPrimary w-100"
                type="submit"
              >
                Send Email
              </button>}
            {/*</form>*/}
          </Modal.Body>
        </Modal>

      {/*Login Model*/}
      <Modal show={loginModal} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className={style.modal__body}>
          <h2 className="mb-lg-4 pb-3">
            {t("Logintotakethe")} <br /> {t("flightagain")}
          </h2>
          <div className="form-group mb-3">
            <TextInput
              name={"email"}
              className="form-control form-control-login "
              rules={{
                required: "Email is required",
                pattern: {
                  value:
                    /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/,
                  message: "Invalid email address",
                },
              }}
              control={control}
              placeholder="Email"
            />
          </div>

          <div className="form-group mb-3">
            <div className="position-relative">
              <TextInput
                type={`${showPassword ? "text" : "password"}`}
                name={"password"}
                className={`form-control form-control-login `}
                control={control}
                showIcon={eyeIcon}
                icon="true"
                hideIcon={hideEyeIcon}
                placeholder="Password"
                setShowPassword={setShowPassword}
                showPassword={showPassword}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be 8 characters long.",
                  },
                }}
              />
            </div>
          </div>

          <div
            onClick={() => {
              setLoginModal(false);
              setForgotModal(!forgotModal);
            }}
            className={`${style.forgotPass} d-flex justify-content-end`}
          >
            {t("ForgetPass")}
          </div>
          <div className="text-center  my-3 ">
            <div className="d-flex align-items-center justify-content-center">
              <div className={style.continue}>{t("Continuewith")}</div>
              <div className="mx-3">
                <div className={style.lineHorizental}></div>
              </div>
              {/*<div>*/}
              {/*  <button className={style.facebook} onClick={handleFaceBookRedirect}>*/}
              {/*    <svg*/}
              {/*      width="10"*/}
              {/*      height="19"*/}
              {/*      viewBox="0 0 11 21"*/}
              {/*      fill="none"*/}
              {/*      xmlns="http://www.w3.org/2000/svg"*/}
              {/*    >*/}
              {/*      <path*/}
              {/*        d="M6.44167 4.84332C6.44167 4.03687 7.16199 3.74718 7.96843 3.74718C8.77487 3.74718 9.63612 3.99773 9.63612 3.99773L10.1529 0.928551C10.1529 0.928551 9.05674 0.552734 6.44167 0.552734C4.83662 0.552734 3.9049 1.16344 3.22373 2.06383C2.58171 2.91725 2.55822 4.28742 2.55822 5.17216V7.18435H0.483398V10.1831H2.55822V20.5963H6.44167V10.1831H9.51868L9.74573 7.18435H6.44167V4.84332Z"*/}
              {/*        fill="white"*/}
              {/*      />*/}
              {/*    </svg>*/}
              {/*  </button>*/}
              {/*  <p className={style.txtFacebook}>Facebook</p>*/}
              {/*</div>*/}
              <div className="mx-3" >
                <button className={style.google} onClick={handleGoogleRedirect}>
                 <GoogleIcons />
                </button>
                <p className={style.txtGoogle}>{t("Google")}</p>
              </div>
            </div>
          </div>

          {loading.login ?  <button
                className="btnPrimary w-100"
                type="submit"
              >
                <Spin /> &nbsp;
                loading...
              </button> :
            <button
              onClick={handleSubmit(login)}
              className="btnPrimary w-100"
              type="submit"
              >
               {t("Login")}
            </button> }
          <p className={`text-center mt-3 ${style.dontHave}`}>
            {t("noaccount")}{" "}
            <span
              onClick={() => {
                setLoginModal(false);
                setRoleModal(!roleModal);
              }}
              className={style.linkTxt}
            >
              {" "}
              {t("Signup")}
            </span>
          </p>
        </Modal.Body>
      </Modal>
      {/*Role Modal*/}
      <Modal show={roleModal} onHide={handleCloseSignupAs} centered>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className={style.modal__body}>
          <h2 className="mb-4 pb-3 text-center">{t("SignUpas")}</h2>

          <button
            onClick={() => {
              setSignupModal(!signupModal);
              setRoleModal(false);
              props?.dispatch( authRole('user'));
            }}
            className="btnPrimary w-100 mb-3"
            type="submit"
          >
            {t("User")}
          </button>
          <button
            onClick={() => {
              Router.push("https://dashboard.earthbirder.com")
            }}
            className="btnPrimary w-100"
            type="submit"
          >
            {t("Guide")}
          </button>
          <p className={`text-center mt-3 ${style.dontHave}`}>
            {t("haveaccount")}{" "}
            <span
              onClick={() => {
                setRoleModal(false);
                setLoginModal(!loginModal);
              }}
              className={style.linkTxt}
            >
              {" "}
              {t("Login")}
            </span>
          </p>
        </Modal.Body>
      </Modal>
      {/*Sign Up Model*/}
      <Modal show={signupModal} onHide={handleCloseSignup} centered>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className={style.modal__body}>
          <h2 className="mb-4 pb-3">
            {t("SignupandSpread")}
            <br /> {t("yourWings")}
          </h2>
          <div className="form-group mb-3">
          
            <TextInput
              name={"name"}
              className="form-control form-control-login "
              rules={{
                required: "Name is required",
              }}
              control={control}
              placeholder="Name"
            />
          </div>
          <div className="form-group mb-3">
            <TextInput
              name={"email"}
              className="form-control form-control-login "
              rules={{
                required: "Email is required",
                pattern: {
                  value:
                    /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/,
                  message: "Invalid email address",
                },
              }}
              control={control}
              placeholder="Email"
            />
          </div>

          <div className="form-group mb-3">
            <div className="position-relative">
              <TextInput
                type={`${showPassword ? "text" : "password"}`}
                name={"password"}
                className={`form-control form-control-login `}
                control={control}
                showIcon={eyeIcon}
                icon="true"
                hideIcon={hideEyeIcon}
                placeholder="Password"
                setShowPassword={setShowPassword}
                showPassword={showPassword}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be 8 characters long.",
                  },
                }}
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <div className="position-relative">
              <TextInput
                type={`${showCPassword ? "text" : "password"}`}
                name={'password_confirm'}
                className={`form-control form-control-login `}
                control={control}
                showIcon={eyeIcon}
                icon="true"
                hideIcon={hideEyeIcon}
                placeholder="Confirm Password"
                setShowPassword={setShowCPassword}
                showPassword={showCPassword}
                rules={{
                  required: "Confirm Password is required",
                  minLength: {
                    value: 8,
                    message: "Confirm Password must be 8 characters long.",
                  },
                }}
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <div className={style.continue}> <Checkbox checked={aggree} ref={agreeRef}   onChange={(e)=> setAggree(e.target.checked)} className="me-2" ></Checkbox> I agree to the <strong> terms of use</strong> and <strong> policies.</strong></div>
            <div onClick={handleOpenTerms} className={`text-primary ${style.continue} cursor-pointer`}>read more...</div>
          </div>
          <div className="text-center  my-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className={style.continue}>{t("Continuewith")}</div>
              <div className="mx-3">
                <div className={style.lineHorizental}></div>
              </div>
              {/*<div>*/}
              {/*  <button className={style.facebook} onClick={handleFaceBookRedirect}>*/}
              {/*    <svg*/}
              {/*      width="10"*/}
              {/*      height="19"*/}
              {/*      viewBox="0 0 11 21"*/}
              {/*      fill="none"*/}
              {/*      xmlns="http://www.w3.org/2000/svg"*/}

              {/*    >*/}
              {/*      <path*/}
              {/*        d="M6.44167 4.84332C6.44167 4.03687 7.16199 3.74718 7.96843 3.74718C8.77487 3.74718 9.63612 3.99773 9.63612 3.99773L10.1529 0.928551C10.1529 0.928551 9.05674 0.552734 6.44167 0.552734C4.83662 0.552734 3.9049 1.16344 3.22373 2.06383C2.58171 2.91725 2.55822 4.28742 2.55822 5.17216V7.18435H0.483398V10.1831H2.55822V20.5963H6.44167V10.1831H9.51868L9.74573 7.18435H6.44167V4.84332Z"*/}
              {/*        fill="white"*/}
              {/*      />*/}
              {/*    </svg>*/}
              {/*  </button>*/}
              {/*  <p className={style.txtFacebook}>Facebook</p>*/}
              {/*</div>*/}
              <div className="mx-3">
                <button className={style.google} onClick={handleGoogleRedirect}>
                  <GoogleIcons/>
                </button>
                <p className={style.txtGoogle}>{t("Google")}</p>
              </div>
            </div>
          </div>
          {loading.signup ?  <button
                className="btnPrimary w-100"
                type="submit"
              >
                <Spin /> &nbsp;
                loading...
              </button>
              :
              <button
              onClick={handleSubmit(Signup)}
              className="btnPrimary w-100"
              type="submit">
                  {t("Signup")}
              </button>
          }
          <p className={`text-center mt-3 ${style.dontHave}`}>
            {t("haveaccount")}{" "}
            <span
              onClick={() => {
                setSignupModal(false);
                setLoginModal(!loginModal);
              }}
              className={style.linkTxt}
            >
              {t("Login")}
            </span>
          </p>
        </Modal.Body>
      </Modal>
       {/*Terms Model*/}
       <Modal show={termsModal} onHide={handleCloseTerms} centered>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className={style.modal__body}>
          <h2 className="mb-4 pb-3 text-center">
          Terms of Use and Policies
          </h2>
           <div className="" style={{fontSize:"14px"}}>
            <div className="">
          {terms && ReactHtmlParser(terms)} </div>
           </div>
          {loading.signup ?  <button
                className="btnPrimary w-100"
                type="submit"
              >
                <Spin /> &nbsp;
                loading...
              </button>
              :
              <div className="d-flex justify-content-center mt-2">
                 <button
              onClick={handleCloseTerms}
              className="btnPrimary "
              type="submit">
                 Back
              </button>
              <button
              onClick={()=> {
                handleCloseTerms()
                setAggree(true)
              }}
              className="btnPrimary ms-2"
              type="submit">
                  Agree
              </button>
              </div>
          }
        </Modal.Body>
      </Modal>

    </>
  );
};


const  mapStoreProps = (state) => {
  return state;
}

export default connect(mapStoreProps)(CustomModal);
