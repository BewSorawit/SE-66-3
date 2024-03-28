import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Creative.css";

function FcCheckDetail() {
  const [fcCheckDetail, setFcCheckDetail] = useState([]);
  const { absenceID } = useParams();

  const [status, setStatus] = useState("");
  const [userIDchange, setUserChangeID] = useState("");
  const navigate = useNavigate();

  // ใช้ useEffect เพื่อเรียก API เมื่อมีการเปลี่ยนแปลงในค่า absenceID
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/FcCheck/send/${absenceID}`)
      .then((res) => {
        console.log(res.data);
        setFcCheckDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [absenceID]);

  function handleSubmit(event) {
    event.preventDefault();

    // ส่งค่า status ไปยัง API เพื่ออัปเดตข้อมูล
    axios
      .put(`${process.env.REACT_APP_API_URL}/FcView/update/${absenceID}`, {
        status,
      })
      .then((res) => {
        console.log(res);
        console.log("add status success");
        navigate("/FcCheck");
      })
      .catch((err) => console.log(err));

    // ส่งค่า userID ไปยัง API เพื่ออัปเดตข้อมูล
    axios
      .put(`${process.env.REACT_APP_API_URL}/UserChange/${absenceID}`, {
        userIDchange,
      })
      .then((res) => {
        console.log(res);
        console.log("พนักงานแทน", userIDchange);
        navigate("/FcCheck");
      })
      .catch((err) => console.log(err));

    axios
      .delete(`${process.env.REACT_APP_API_URL}/delete/${absenceID}`)
      .then((res) => {
        console.log(res);
        console.log("delete success");
        navigate("/FcCheck");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="modalBackground">
      <div className="modalFcCheckDetail">
        <div className="titleCloseBtn">
          <td>
            <Link to="/FcCheck" className="btn btn-dark">
              X
            </Link>
          </td>
        </div>
        <div className="body ">
          {fcCheckDetail.map((data, i) => (
            <div key={i} className="sarabun fonttext">
              <p className="card-text">สาขาที่ต้องการ: {data.branchName}</p>
              <p className="card-text">วันที่ต้องการ: {data.date}</p>
              <p className="card-text">เวลาเริ่มงาน: {data.timeStart}</p>
              <p className="card-text">เวลาเลิกงาน: {data.timeEnd}</p>
              <p className="card-text">พนักงานที่มาแทน: {data.firstName}</p>
              <p></p>
              <form onSubmit={handleSubmit}>
                <div className="fonttext2">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setStatus("success");
                      setUserChangeID(data.userIDchange);
                    }}
                  >
                    อนุมัติ
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FcCheckDetail;
