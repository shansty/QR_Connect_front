import { Col, Row, Card } from 'antd';
import modernDesign from '../../assets/images/modern_design.jpg';
import cleanDesign from '../../assets/images/clean-design.jpg';
import greatSupport from '../../assets/images/great-support.jpg';
import easyCustomise from '../../assets/images/easy-customise.jpg';
import unlimitedFeatures from '../../assets/images/unlimited-features.jpg';
import advancedOption from '../../assets/images/advanced-option.jpg';

const { Meta } = Card;

const Feature = () => {
    return (
        <div className='block bgGray'>
            <div className='container-fluid'>
                <div className="titleHolder">
                    <h2>Key Features and Benefits</h2>
                    <p> Dswsedvnl lnlkwnev lewfknwelfkn lewdjvnglwejnv</p>
                </div>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card
                            hoverable
                            cover={<img alt="Modern Design" src={modernDesign} />}
                        >
                            <Meta title="Modern Design" />
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card
                            hoverable
                            cover={<img alt="Clean and Elegant" src={cleanDesign} />}
                        >
                            <Meta title="Clean and Elegant" />
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card
                            hoverable
                            cover={<img alt="Great Support" src={greatSupport} />}
                        >
                            <Meta title="Great Support" />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            cover={<img alt="Easy to customise" src={easyCustomise} />}
                        >
                            <Meta title="Easy to customise" />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            cover={<img alt="Unlimited Features" src={unlimitedFeatures} />}
                        >
                            <Meta title="Unlimited Features" />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            cover={<img alt="Advanced Options" src={advancedOption} />}
                        >
                            <Meta title="Advanced Options" />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Feature;
