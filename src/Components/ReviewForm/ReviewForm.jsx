import React, { useEffect, useState } from 'react';
import GiveReviews from './GiveReviews.jsx';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';

const ReviewForm = () => {
  const [reviewData, setReviewData] = useState({});

  const reportData = [
    {
      serialNumber: 1,
      doctorName: 'Dr. John Doe',
      doctorSpeciality: 'Cardiology',
  
    },
    {
      serialNumber: 2,
      doctorName: 'Dr. Jane Smith',
      doctorSpeciality: 'Dermatology',

    },
    // Add more report data objects as needed
  ];

  const handleGiveReview = (serialNumber) => {
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
      [serialNumber]: ''
    }));
  };

  const handleReviewSubmit = (serialNumber, review) => {
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
      [serialNumber]: review
    }));
  };
  const navigate = useNavigate();
  useEffect(() => {
    //   const authtoken = sessionStorage.getItem("auth-token");
    //   if (!authtoken) {
    //       navigate("/login");
    //   }
  }, [])
  return (
    <div style={{ marginTop: '10%' }} className="reviews-container">
      <h1>Reviews</h1>
      <table className="report-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            {/* <th>Charges</th> */}
            <th>Provide Review</th>
            <th>Review Feedback</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((report) => (
            <tr key={report.serialNumber}>
              <td>{report.serialNumber}</td>
              <td>{report.doctorName}</td>
              <td>{report.doctorSpeciality}</td>
              {/* <td>{report.charges}</td> */}
              <td>
                {!reviewData[report.serialNumber] ? (
                  <Popup
                    trigger={
                      <button
                        className="give-review-button"
                        onClick={() => handleGiveReview(report.serialNumber)}
                      >
                        Click Here
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="modal">
                        <GiveReviews
                          serialNumber={report.serialNumber}
                          onReviewSubmit={handleReviewSubmit}
                          review={reviewData[report.serialNumber]} // Pass the review data
                        />
                        <button className="close-modal-button" onClick={close}>
                          Close
                        </button>
                      </div>
                    )}
                  </Popup>
                ) : (
                  <button className="give-review-button" disabled>
                    Review Given
                  </button>
                )}
              </td>
              <td>
                {reviewData[report.serialNumber] && (
                  <div className="review-given">
                    <p>{reviewData[report.serialNumber]}</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewForm;