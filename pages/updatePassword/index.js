import React, { useState } from "react";
import Header from "../../Compoments/Layout/Header";
import style from './UpdatePassword.module.css'
import { Col, Container, Row } from "react-bootstrap";
import TextInput from "../../Compoments/TextInput";
import { useForm } from "react-hook-form";
import hideEyeIcon from "../../assets/images/Hide.png";
import eyeIcon from "../../assets/images/Hide-2.png";
import {connect} from "react-redux";
import {authResetPasswordUser} from "../../Redux/auth/action";
import Router from "next/router";
import {toast, ToastContainer} from "react-toastify";
import {Toaster} from "../../extras/constants";


const ForgotPassword = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading , setLoading] = useState(false);

  const UpdatePassword = async  (data) => {
    if(props?.query?.token){
      const payload = {
        ...data,
        ...props?.query,
      }
      try {
        setLoading(true);
        const getResetPassword = await props?.dispatch(authResetPasswordUser(payload));
        if(getResetPassword.payload?.status === 200){
          setLoading(false);
          toast.success(getResetPassword.payload?.data?.message, Toaster);
          Router.push('/');
        }else {
          setLoading(false);
          if(getResetPassword.payload.response?.data?.message) return toast.error(getResetPassword.payload.response?.data?.message, Toaster);
          return  toast.error(getResetPassword.payload.message);
        }
      }catch (e) {
        console.log({e});
        setLoading(false);

      }
    }
  };
  return (
    <>
      <Header menu={false} />
      <section>
        <Container style={{height: '100vh'}}>
          <Row className="d-flex align-items-center h-100 justify-content-center">
            <Col lg={5} className={style.formSection}>
              <h2 className="mb-5 text-center">Reset Password</h2>
              <div className="form-group mb-3">
                <div className="position-relative">
                  <TextInput
                    type={`${showPassword ? "text" : "password"}`}
                    {...register("password")}
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
                    {...register("password_confirm")}
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
              {loading ? <div className="w-100">
                <p className="text-center border-1 bg-success p-3 border-danger   text-light"> Loading </p>
              </div> :
                <button
                  onClick={handleSubmit(UpdatePassword)}
                  className="btnPrimary w-100 mt-3"
                  type="submit"
                >
              Reset Password
               </button>}
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer/>
    </>
  );
};



function mapStateToProps(state) {
  return state;
}


export default connect(
    mapStateToProps,
)(ForgotPassword);

export   async  function getServerSideProps(context){
  const {query } = context;
  return {
    props: {
      query : query || null,
    }
  }
}


