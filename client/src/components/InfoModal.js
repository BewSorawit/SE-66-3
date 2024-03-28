import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function InfoModal({ user }) {
  const [status, setStatus] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [userList, setUserList] = useState([]);
  const [managerSend, setManagerSend] = useState([]);
  const navigate = useNavigate();
  const { absenceID } = useParams();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //พนักงานในสาขาเดียวกับ Manager
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInbranch = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/all`
        );
        const filterUserInbranch = userInbranch.data.filter(
          (data) => data.branchID === user.branchID && data.roleID !== "2"
        );
        setUserList(filterUserInbranch);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user]);

  //รายละเอียด
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/ManagerView/sendFC/${absenceID}`)
      .then((res) => setManagerSend(res.data))
      .catch((err) => console.log(err));
  }, [absenceID]);

  //เมื่อกดยืนยัน
  const handleSubmit = () => {
    if (status === "") {
      alert("กรุณาเลือกสถานะก่อนที่จะส่งข้อมูล");
    } else if (
      status === "yes" &&
      (selectedOption === "เลือกพนักงาน" || selectedOption === "")
    ) {
      alert("กรุณาเลือกพนักงาน");
    } else if (status === "no" && selectedOption !== "") {
      setSelectedOption("");
    } else {
      const requestData = {
        absenceID: absenceID,
        userID: status === "yes" ? selectedOption : null,
        status: status,
      };

      console.log("status:", status);
      console.log("user:", selectedOption);
      console.log("absenceID:", absenceID);

      //เพิ่มข้อมูลเข้า db
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/ManagerView/saveDataUser`,
          requestData
        )
        .then((res) => {
          console.log("Data saved successfully");
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });

      //อัพเดทสถานะ เป็น CHECK
      const mainStatus = "CHECK";
      axios
        .put(`${process.env.REACT_APP_API_URL}/FcView/update/` + absenceID, {
          status: mainStatus,
        })
        .then((res) => {
          console.log(res);
          navigate("/ManagerView");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalManagerToFc">
        <div className="titleCloseBtn">
          <td>
            <Link to="/ManagerView" className="btn btn-dark">
              X
            </Link>
          </td>
        </div>
        <div className="body">
          {/* <div>
            {managerSend}
          </div> */}
          {managerSend.length > 0 &&
            managerSend.map((data, i) => (
              <div key={i} className="sarabun fonttext">
                <p className="card-text">สาขาที่ต้องการ: {data.branchName}</p>
                <p className="card-text">วันที่ต้องการ: {data.date}</p>
                <p className="card-text">เวลาเริ่มงาน: {data.timeStart}</p>
                <p className="card-text">เวลาเลิกงาน: {data.timeEnd}</p>
                <p></p>
              </div>
            ))}
          <div className="userInBranch">
            <div className="mb-2">
              <h6>หาพนักงานได้หรือไม่</h6>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">สถานะ</option>
                <option value="yes">หาพนักงานได้</option>
                {/* <option value="no">หาพนักงานไม่ได้</option> */}
              </Form.Select>
            </div>
            <h6>รายชื่อพนักงานในสาขา</h6>
            <Form.Select
              aria-label="Default select example"
              value={status === "no" ? "เลือกพนักงาน" : selectedOption}
              onChange={handleSelectChange}
              disabled={status === "no"}
            >
              <option>เลือกพนักงาน</option>
              {userList.map((user) => (
                <option key={user.userID} value={user.userID}>
                  {user.firstName}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <br></br>
        <div className="footer">
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
