import React from 'react'
import Chart from "../assets/Chart.png"
import "../styles/body.css"
import Graphh from "../assets/grid2.png"
function Body() {
  return (
    <div>

        <div className="bosy_content">
            <div className="left_side">

            <div className="main-title">
                <h1 className="maine-title_heading">Numerical Data Processor</h1>
                <p className='maine-title_para'>Upload your .xlsx or .csv files, perform mathematical operations on numerical columns, and view results seamlessly!</p>
               
                </div>

            </div>
            <div className="right_side">
                <img src={Graphh} alt="" />
            </div>

        </div>

    </div>
  )
}

export default Body