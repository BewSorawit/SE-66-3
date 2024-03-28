import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Creative.css";

function FCviews() {
  const [FCviews, setFCviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/FcView`)
      .then((res) => setFCviews(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" d-flex  modalBackground  sarabun bg-success justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-3 sarabun">
        <table className="table fonttext2 sarabun">
          <thead>
            <tr>
              <th>สาขา</th>
              <th>วันที่ต้องการ</th>
              <th>เวลาเริ่มงาน</th>
              <th>เวลาเลิกงาน</th>
              <th>สถานะ</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {FCviews.map((data, i) => (
              <tr key={i}>
                <td>{data.branchName}</td>
                <td>{data.date}</td>
                <td>{data.timeStart}</td>
                <td>{data.timeEnd}</td>

                <td>
                  <button className="btn btn-primary ">{data.status}</button>
                </td>

                <td>
                  <Link
                    to={`/FcView/send/${data.absenceID}`}
                    className="btn btn-warning"
                  >
                    รายละเอียด
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FCviews;
