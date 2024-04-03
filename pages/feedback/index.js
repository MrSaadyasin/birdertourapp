import { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import Router from "next/router";
import axios from "axios";
import {baseUrl} from "../../constants/baseurl.constants";
import {toast, ToastContainer} from "react-toastify";
import {Toaster} from "../../extras/constants";

const Feedback = (props) => {
  console.log({props});
  const [modal1Open, setModal1Open] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [feedBackInput, setFeedBackInput] = useState("");

  const handleRating = (num) => {
    setValue(num);
  };
  useEffect(() => {
    setModal1Open(true);
  }, []);

  const handleFeedback = async () => {
    console.log(value);
    console.log("input", feedBackInput);
    try {
      const data = {
        ...props?.query,
        comment : feedBackInput,
        status : "success",
        rating : value
      }
      const handleFeedBack = await axios.post(`${baseUrl}/feedback/add`,data);
      toast.success(handleFeedBack?.data?.message, Toaster);
      // Router.push("/");
    }catch (e){
       toast.error(e.response?.data?.message, Toaster);
    }
    finally {
      Router.push('/')
    }
  };





  return (
    <>
      <ToastContainer/>
      <section>
        <Modal
          title=""
          centered
          //   width={700}
          style={{
            top: 20,
          }}
          footer={
            loading ? (
              <button
                key="submit"
                className="btn btn-md btn-primary"
                type="primary"
                disabled
                style={{fontFamily: 'Monserrat-Regular'}}
              >
                <Spin />
                &nbsp; loading...
              </button>
            ) : (
              <button
                key="submit"
                className="btn btn-md btn-primary"
                type="primary"
                onClick={handleFeedback}
              >
                Submit Feedback
              </button>
            )
          }
          open={modal1Open}
          onCancel={async () => {
            setModal1Open(false);
            try {
              const data = {
                ...props?.query,
                status : "cancel",
              }
              const handleFeedBack = await axios.post(`${baseUrl}/feedback/add`,data);
              Router.push("/");
            }catch (e){
              Router.push("/");
            }

          }}
        >
          <div className="text-center p-lg-4 pt-5">
            <h2 className="mb-3" style={{ fontFamily: "Monserrat-Semibold" }}>
              We Appreciate your Feedback!
            </h2>
            <p
              style={{ fontFamily: "Monserrat-Medium" }}
              className="text-muted"
            >
              We highly value your feedback and would greatly appreciate it if
              you could take a few moments to provide us with your valuable
              insights about your tour experience
            </p>
            <div className="mt-3">
              <div class="rating my-4">
                <span
                  onClick={(e) => handleRating(1)}
                  className={
                    value >= 1 ? "px-1 fa fa-star" : "px-1 fa fa-star-o"
                  }
                ></span>
                <span
                  onClick={(e) => handleRating(2)}
                  className={
                    value >= 2 ? "px-1 fa fa-star" : "px-1 fa fa-star-o"
                  }
                ></span>
                <span
                  onClick={(e) => handleRating(3)}
                  className={
                    value >= 3 ? "px-1 fa fa-star" : "px-1 fa fa-star-o"
                  }
                ></span>
                <span
                  onClick={(e) => handleRating(4)}
                  className={
                    value >= 4 ? "px-1 fa fa-star" : "px-1 fa fa-star-o"
                  }
                ></span>
                <span
                  onClick={(e) => handleRating(5)}
                  className={
                    value >= 5 ? "px-1 fa fa-star" : "px-1 fa fa-star-o"
                  }
                ></span>
              </div>
              <div>
                <textarea
                  placeholder="Share your experience"
                  className="form-control"
                  onChange={(e)=>setFeedBackInput(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
};
export default Feedback;

export async  function getServerSideProps(context){
  const {query} = context;
  console.log("query", query);
  return {
    props: {
      query : query
    }
  }
}
