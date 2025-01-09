import { Button, Modal } from 'antd';
import { useState } from 'react';


const Works = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div id="works" className="block worksBlock">
            <div className="container-fluid">
                <div className="titleHolder">
                    <h2>How it works</h2>
                    <p>check our latest video to know how it works</p>
                </div>
                <div className="contentHolder">
                    <Button size="large" onClick={showModal}><i className="fas fa-play"></i></Button>
                </div>
                <Modal
                    title="Woocommerce Tutorial"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    destroyOnClose={true}
                >
                    <iframe title="Woocommerce Tutorial" width="100%" height="350" src="https://www.youtube.com/embed/8f8_JYIzOno?list=PLiUrl-SQRR7LQINGQGE99pXWDuKq4SxfU"></iframe>
                </Modal>
                <p>You can describe how it works</p>
            </div>
        </div>
    );
}

export default Works;
