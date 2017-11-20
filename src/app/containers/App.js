import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Card from '../components/Card';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from '../actions/index';


let pokeCatch = new Array();
let pokemon = JSON.parse(localStorage.getItem('pokemonJSON'));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      names: [],
      open: false,
    };
  }

  componentDidMount = () => {
    this.props.actions.traerEspecies();
    const audio = document.getElementById('myaudio');
    audio.volume = 0.05;
  }

  handleData = () => {
    let names = new Array();
    const datas = this.props.pokedex.pokedex;
    for (let i = 0; i < datas.length; i++) {
      names.push(datas[i].name);
    }
    this.setState({names: names});
  }

  handleFilter = () => {
    let fil = document.getElementById('filters').value;
    let pokedexResponse = this.props.pokedex.pokedex.filter((types) => types.type[0] === fil );
    this.setState({results: pokedexResponse});
  }


  handleClose = () => {
    this.setState({open: false});
  };

  handleSearch = value => {
    let pokede = this.props.pokedex.pokedex.filter((names) => names.name == value);
    this.setState({results: pokede});
  }

  handleCatch = event => {
    let number = event.target.id;
    document.getElementById(number).classList.add('card__catch--active');
    let catchs;
    const datas = this.props.pokedex.pokedex;
    for (let i = 0; i < datas.length; i++) {
      if (number === datas[i].name) {
        catchs = datas[i].name;
      }
    }
    localStorage.setItem('pokemonCatch', JSON.stringify(catchs));
    let pokemon = JSON.parse(localStorage.getItem('pokemonCatch'));
    pokeCatch.push(pokemon);
    localStorage.setItem('pokemonJSON', JSON.stringify(pokeCatch));

    this.setState({open: true});
  }

  componentDidUpdate = () => {
    let id;
    let count = pokemon.length;
    for (let i = 0; i < count; i++) {
      id = pokemon[i];
      document.getElementById(id).classList.add('card__catch--active');
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <Grid fluid>
        <Row center="lg" between="lg">
          <Col xs={12} sm={12} md={12} lg={12}>
            <header className="header">
              <h1 className="header__title">Pokédex</h1>
              <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <AutoComplete
                  floatingLabelText="Put the name of your pokemon ..."
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.state.names}
                  maxSearchResults={15}
                  onClick={this.handleData}
                  onUpdateInput={this.handleSearch}
                  className="header__search"
                />
              </MuiThemeProvider>
              <select onChange={this.handleFilter} id="filters" className="header__select">
                <option value="All">All</option>
                <option value="Grass">Grass</option>
                <option value="Fire">Fire</option>
                <option value="Water">Water</option>
                <option value="Bug">Bug</option>
                <option value="Normal">Normal</option>
                <option value="Poison">Poison</option>
                <option value="Electric">Electric</option>
                <option value="Ground">Ground</option>
                <option value="Fighting">Fighting</option>
                <option value="Psychic">Psychic</option>
                <option value="Rock">Rock</option>
                <option value="Ghost">Ghost</option>
                <option value="Ice">Ice</option>
                <option value="Dragon">Dragon</option>
              </select>
            </header>
          </Col>
        </Row>
        <Row center="lg" between="lg" className="card__content">
          {(this.state.results.length === 0) ? this.props.pokedex.pokedex.map((itemPokemon, index) => {
            return (
              <Card
                key={index}
                image={itemPokemon.img}
                number={itemPokemon.num}
                name={itemPokemon.name}
                typeOne={itemPokemon.type[0]}
                height={itemPokemon.height}
                weight={itemPokemon.weight}
                candy={itemPokemon.candy_count}
                egg={itemPokemon.egg}
                wOne={itemPokemon.weaknesses[0]}
                catchs={this.handleCatch}
                id={itemPokemon.name}
                />
            );
          }) :
          this.state.results.map((itemPokemon, index) => {
            return (
              <Card
                key={index}
                image={itemPokemon.img}
                number={itemPokemon.num}
                name={itemPokemon.name}
                typeOne={itemPokemon.type[0]}
                height={itemPokemon.height}
                weight={itemPokemon.weight}
                candy={itemPokemon.candy_count}
                egg={itemPokemon.egg}
                wOne={itemPokemon.weaknesses[0]}
                catchs={this.handleCatch}
                id={itemPokemon.name}
                />
            );
          })
        }
        </Row>
        <footer className="footer">
          <audio autoPlay id="myaudio">
            <source src="assets/images/media.mp3" type="audio/mp3"/>
          </audio>
          <h2>Gotta catch'em all !!</h2>
          <div className="footer__images">
            <img src="assets/images/eevee.png"/>
            <img src="assets/images/bellsprout.png"/>
            <img src="assets/images/bullbasaur.png"/>
            <img src="assets/images/charmander.png"/>
            <img src="assets/images/dratini.png"/>
            <img src="assets/images/jigglypuff.png"/>
            <img src="assets/images/meowth.png"/>
            <img src="assets/images/pikachu-1.png"/>
            <img src="assets/images/psyduck.png"/>
            <img src="assets/images/squirtle.png"/>
            <img src="assets/images/abra.png"/>
            <img src="assets/images/caterpie.png"/>
            <img src="assets/images/mankey.png"/>
            <img src="assets/images/mew.png"/>
            <img src="assets/images/pidgey.png"/>
            <img src="assets/images/rattata.png"/>
            <img src="assets/images/venonat.png"/>
            <img src="assets/images/weedle.png"/>
            <img src="assets/images/zubat.png"/>
          </div>
        </footer>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Dialog
            title="Congratulations!!"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            You have caught this pokemon.
          </Dialog>
        </MuiThemeProvider>
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
