import React from 'react'
import DashboardLayout from '../../Compoments/DashboardLayout/DashboardLayout/DashboardLayout'
import { Col, Row } from 'react-bootstrap'
import axios from "axios";
import {allTours, upcomingTour} from "../../constants/endpoint.constants";

const Dashboard = () => {
  return (
    <DashboardLayout>
      
       <p>eklhdcxkjhk</p>
       <p>eklhdcxkjhk</p>
    </DashboardLayout>
  )
}

export default Dashboard

export async function getServerSideProps(context) {
    return {
        redirect: {
            permanent: false,
            destination: "/404",
        }
    }
}

