import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Card from '../components/Card';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AutoComplete from 'material-ui/AutoComplete';
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
      names: []
    };
  }

  componentDidMount = () => {
    this.props.actions.traerEspecies();
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
      if (number === datas[i].num) {
        catchs = datas[i].num;
      }
    }
    localStorage.setItem('pokemonCatch', JSON.stringify(catchs));
    let pokemon = JSON.parse(localStorage.getItem('pokemonCatch'));
    pokeCatch.push(pokemon);
    localStorage.setItem('pokemonJSON', JSON.stringify(pokeCatch));
  }

  componentDidUpdate = () => {
    let id;
    let count = pokemon.length;
    console.log(count);
    for (let i = 0; i < count; i++) {
      console.log('esto aldks');
      id = pokemon[i];
      document.getElementById(id).classList.add('card__catch--active');
    }
  }
  render() {
    return (
      <Grid fluid>
        <Row center="lg" between="lg">
          <Col xs={12} sm={6} md={3} lg={4}>
            <header>
              <h1>Mos important heading here</h1>
              <h3>Less important headingd here</h3>
              <p>Some additional information here</p>
            </header>
            <select onChange={this.handleFilter} id="filters">
              <option value="All">All</option>
              <option value="Grass">Grass</option>
              <option value="Fire">Fire</option>
              <option value="Normal">Normal</option>
              <option value="Poison">Poison</option>
            </select>
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
              <AutoComplete
                floatingLabelText="Type 'r', case insensitive"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={this.state.names}
                maxSearchResults={15}
                onClick={this.handleData}
                onUpdateInput={this.handleSearch}
              />
            </MuiThemeProvider>
          </Col>
        </Row>
        <Row center="lg" between="lg">
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
                id={itemPokemon.num}
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
                id={itemPokemon.num}
                />
            );
          })
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
