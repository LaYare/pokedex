import React, {Component, PropTypes} from 'react';
const {Row, Col} = require('react-flexbox-grid');

class Card extends Component {
  render() {
    return (
      <Col xs={12} sm={6} md={6} lg={4}>
        <Row middle="lg" className="card">
          <Col xs={12} sm={12} md={6} lg={6}>
            <div className="card__avatar">
              <div className="card__avatar--img">
                <img src={this.props.image}/>
              </div>
              <div className="card__avatar__button" onClick={this.props.talk} id={this.props.talkId}></div>
              <img src="../assets/images/icon.png" className="card__avatar__horn"/>
              <img src="../assets/images/icon.png" className="card__avatar__horn card__avatar__horn--second"/>
            </div>
            <div className="card__avatar__number">Number: {this.props.number}</div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className="card__description">
            <Row className="card__description--row">
              <Col xs={6} sm={6} md={6} lg={6} className="card__description__column">
                <ul>
                  <li>Name: {this.props.name}</li>
                  <li>Type:
                    <ol>
                      <li>{this.props.typeOne}</li>
                    </ol>
                  </li>
                  <li>Height: {this.props.height}</li>
                  <li>Weight: {this.props.weight}</li>
                </ul>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} className="card__description__column">
                <ul>
                  <li>Candies: {this.props.candy}</li>
                  <li>Egg: {this.props.egg}</li>
                  <li>Weaknesses:
                    <ol>
                      <li>{this.props.wOne}</li>
                    </ol>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <div className="card__catch" onClick={this.props.catchs} id={this.props.id}>
          </div>
        </Row>
      </Col>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  number: PropTypes.string,
  name: PropTypes.string,
  typeOne: PropTypes.string,
  height: PropTypes.string,
  weight: PropTypes.string,
  candy: PropTypes.number,
  egg: PropTypes.string,
  wOne: PropTypes.string,
  catchs: PropTypes,
  talk: PropTypes,
  talkId: PropTypes.string,
  id: PropTypes.string
};

export default Card;
