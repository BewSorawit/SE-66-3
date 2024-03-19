const { Absence, Branch, Schedule, TypeTime, ShiftDetail, Shift } = require('../models');

const getFcView = async (req, res) => {
    try {
        const fcViewData = await Absence.findAll({
            attributes: ['absenceID'],
            include: [
                {
                    model: ShiftDetail,
                    include: [
                        {
                            model: Shift,
                            attributes: [],
                            include: [
                                { model: Branch, attributes: ['branchName'] },
                                { model: Schedule, attributes: ['date'] },
                                { model: TypeTime, attributes: ['timeStart', 'timeEnd'] }
                            ]
                        }
                    ]
                }
            ],
            where: { status: 'out branch' }
        });

        // ตรวจสอบค่าของข้อมูลที่ถูกส่งกลับมาก่อนที่จะเข้าถึง
        if (fcViewData && fcViewData.length > 0) {
            // แปลงข้อมูลที่ได้เป็นรูปแบบที่ต้องการ
            const formattedData = fcViewData.map(item => ({
                absenceID: item.absenceID,
                branchName: item.ShiftDetail && item.ShiftDetail.Shift && item.ShiftDetail.Shift.Branch ? item.ShiftDetail.Shift.Branch.branchName : null,
                date: item.ShiftDetail && item.ShiftDetail.Shift && item.ShiftDetail.Shift.Schedule ? item.ShiftDetail.Shift.Schedule.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : null,
                timeStart: item.ShiftDetail && item.ShiftDetail.Shift && item.ShiftDetail.Shift.TypeTime ? item.ShiftDetail.Shift.TypeTime.timeStart : null,
                timeEnd: item.ShiftDetail && item.ShiftDetail.Shift && item.ShiftDetail.Shift.TypeTime ? item.ShiftDetail.Shift.TypeTime.timeEnd : null,
                status: item.status
            }));

            res.json(formattedData);
        } else {
            res.json([]); // ถ้าไม่มีข้อมูลที่จะแสดงผลให้ส่งข้อมูลเปล่ากลับไป
        }
    } catch (error) {
        console.error('Error fetching FcView data:', error);
        res.status(500).json({ error: 'Unable to fetch FcView data' });
    }
};

module.exports = { getFcView };
