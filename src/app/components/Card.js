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
              <div className="card__avatar__button"></div>
              <img src="../assets/images/icon.png" className="card__avatar__horn"/>
              <img src="../assets/images/icon.png" className="card__avatar__horn card__avatar__horn--second"/>
            </div>
            <div className="card__avatar__number">Número: {this.props.number}</div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} className="card__description">
            <Row className="card__description--row">
              <Col xs={6} sm={6} md={6} lg={6} className="card__description__column">
                <ul>
                  <li>Nombre: {this.props.name}</li>
                  <li>Tipo:
                    <ol>
                      <li>{this.props.typeOne}</li>
                    </ol>
                  </li>
                  <li>Atura: {this.props.height}</li>
                  <li>Peso: {this.props.weight}</li>
                </ul>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} className="card__description__column">
                <ul>
                  <li>Caramelos: {this.props.candy}</li>
                  <li>Huevo: {this.props.egg}</li>
                  <li>Devilidades:
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
  id: PropTypes.string
};

export default Card;
