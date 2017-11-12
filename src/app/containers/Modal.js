import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Card from '../components/Card';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount = () => {
    this.props.actions.traerEspecies();
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  render() {
    const actions = [
      <FlatButton
        key="first"
        label="Cancelar"
        primary
        onClick={this.handleClose}
        />,
      <FlatButton
        key="second"
        label="Aceptar"
        primary
        keyboardFocused
        onClick={this.handleClose}
        />
    ];
    return (
      <Grid fluid>
        <Row center="lg">
          <Col xs={12} sm={3} md={2} lg={12}>
            <p>{this.props.pokedex.error}</p>
            {this.props.pokedex.pokedex.map((itemPokemon, index) => {
              return (
                <Card
                  key={index}
                  image={itemPokemon.img}
                  number={itemPokemon.num}
                  name={itemPokemon.name}
                  typeOne={itemPokemon.type[0]}
                  typeTwo={itemPokemon.type[1]}
                  height={itemPokemon.height}
                  weight={itemPokemon.weight}
                  candy={itemPokemon.candy_count}
                  egg={itemPokemon.egg}
                  wOne={itemPokemon.weaknesses[0]}
                  wTwo={itemPokemon.weaknesses[1]}
                  wTree={itemPokemon.weaknesses[2]}
                  wFour={itemPokemon.weaknesses[3]}
                  />
              );
            })}
          </Col>
          {
            <Col xs={6} sm={3} md={2} lg={1}>
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
              <div>
                <RaisedButton label="Woow" onClick={this.handleOpen}/>
                <Dialog
                  title="¡¡¡Felicidades!!!"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  >
                  Has econtrado este pokemon!!
                </Dialog>
              </div>
            </MuiThemeProvider>
          </Col>
        }
        </Row>
      </Grid>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  pokedex: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pokedex: state.pokedex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
