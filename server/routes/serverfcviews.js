const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {

    const sql = `
    SELECT branch.branchID as ID, branch.branchName as branchName, DATE_FORMAT(schedule.date,'%e %M %Y') AS date, 
    typetime.timeStart as timeStart, typetime.timeEnd as timeEnd, absence.status as status
    FROM (((((shift INNER JOIN branch ON shift.branchID = branch.branchID)
    INNER JOIN schedule ON schedule.scheduleID = shift.scheduleID)
    INNER JOIN typetime ON shift.timeID = typetime.timeID)
    INNER JOIN shiftdetail ON shift.shiftID = shiftdetail.shiftID)
    INNER JOIN absence ON shiftdetail.absenceID = absence.absenceID) `;
  
    db.query(sql, (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })

   /* const sqldate = `
    SELECT DISTINCT sch.date AS absence_date
    FROM schedule sch
    JOIN shift s ON sch.scheduleID = s.scheduleID
    JOIN shiftdetail sd ON s.shiftID = sd.shiftID
    WHERE sd.absenceID IS NOT NULL; ` ;
  
    db.query(sqldate, (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })*/
  
})

router.get("/send/:branchID", (req, res) => {
    const branchID = req.params.branchID;
    const sql = `
    SELECT
        branch.branchID as branchID,
        branch.branchName as branchName,
        DATE_FORMAT(schedule.date,'%e %M %Y') AS date,
        typetime.timeStart as timeStart,
        typetime.timeEnd as timeEnd
    FROM
        shift
        INNER JOIN branch ON shift.branchID = branch.branchID
        INNER JOIN schedule ON schedule.scheduleID = shift.scheduleID
        INNER JOIN typetime ON shift.timeID = typetime.timeID
        INNER JOIN shiftdetail ON shift.shiftID = shiftdetail.shiftID
        INNER JOIN absence ON shiftdetail.absenceID = absence.absenceID
    WHERE
        branch.branchID = ?`;
  
    db.query(sql, [branchID], (err, data) => {
        if(err) return res.status(500).json({ error: 'Error fetching branch details' });
        return res.json(data);
    });
});


/*app.get("/send/:ID", (req, res) => {
    
    const sql = `
    SELECT branch.branchID as ID, branch.branchName as branchName, DATE_FORMAT(schedule.date,'%W %M %e %Y') AS date, 
    typetime.timeStart as timeStart, typetime.timeEnd as timeEnd
    FROM (((((shift INNER JOIN branch ON shift.branchID = branch.branchID)
    INNER JOIN schedule ON schedule.scheduleID = shift.scheduleID)
    INNER JOIN typetime ON shift.timeID = typetime.timeID)
    INNER JOIN shiftdetail ON shift.shiftID = shiftdetail.shiftID)
    INNER JOIN absence ON shiftdetail.absenceID = absence.absenceID) `;*/

   /* const values = [
        req.body.branchName,
        req.body.date,
        req.body.timeStart,
        req.body.timeEnd    ]
    const ID = req.params.ID;

    db.query(sql, [...values, ID], (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
  */
  /*  db.query(sql,  (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})*/

router.get("/AfterSend", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

/*app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`Name`,`Email`) VALUES (?,?)";
    const values = [
        req.body.name,
        req.body.email 
    ]

    db.query(sql, [values], (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student set `Name` = ?, `Email` = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email 
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})*/


module.exports = router;