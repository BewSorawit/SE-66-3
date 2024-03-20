import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./Creative.css";


function SendToManager() {
    //  const navigate = useNavigate();
    const [send,setSend] = useState([]);
    const { branchID } = useParams();

    // ใช้ useEffect เพื่อเรียก API เมื่อมีการเปลี่ยนแปลงในค่า branchID 
    useEffect(() => {
            axios.get(`${process.env.LOCALHOST}/send/` + branchID)
                .then(res => {
                    console.log(res.data);
                    setSend(res.data);
                })
                .catch(err => console.log(err));
        
    }, [branchID]); 

    return (

        <div className="modalBackground">
            <div className="modalContainer">
        
        <div className="titleCloseBtn">
            <td><Link to="/" className='btn btn-dark' >X</Link></td>
        </div>

        <div className="body ">

              {/* แสดงข้อมูลที่ได้รับจาก API */}
              {send.map((data, i) => (
                <div key={i}>

                    <p className="card-text fonttext" >สาขา: {data.branchName}</p>
                    <p className="card-text fonttext">วันที่ต้องการ: {data.date}</p>
                    <p className="card-text fonttext">เวลาเริ่มงาน: {data.timeStart}</p>
                    <p className="card-text fonttext">เวลาเลิกงาน: {data.timeEnd}</p>
                    <p></p>

                    <div className='margin'>
                        <td><Link to="/AfterSend" className='btn btn-danger '>ส่งต่อ</Link></td>
                    </div>

                </div>
            ))}


        </div>

          

</div>


</div>


    
  
       
    );
}

export default SendToManager;
