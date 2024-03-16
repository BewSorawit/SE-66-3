// client/src/components/index.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import { Row, Col, Modal } from 'antd';
import { createEvent } from '../function/fullcalendar';

const Index = () => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        name: '',
        start: '',
        end: ''
    });

    const handleSelect = (info) => {
        showModal();
        console.log(info);
        setValues({
            ...values,
            start: info.start,
            end: info.end
        });
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        try {
            await createEvent(values);
            console.log('Event created successfully');
        } catch (error) {
            console.error('Error creating event:', error);
        }
        setOpen(false);
    };

    const handleCancel = () => {
        console.log('Cancel button clicked');
        setOpen(false);
    };

    const onChangeValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <Row>
                <Col span={6}></Col>
                <Col span={18}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        selectable={true}
                        select={handleSelect}
                    />
                    <Modal
                        title="Create Event"
                        open={open}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <input type="text" name="name" onChange={onChangeValues} />
                    </Modal>
                </Col>
            </Row>
        </div>
    );
};

export default Index;
