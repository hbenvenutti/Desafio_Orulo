/* eslint-disable camelcase */
import React, { Component } from 'react';
import { FaRegStar, FaStar, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';
import {
  SearchButton,
  FormContainer,
  List,
  FavoriteButton,
  Pagination,
  Loading,
  CityInput,
  UfInput,
} from './styles';
import Container from '../../components/Container';
import logo from '../../images/logo.svg';

export default class Main extends Component {
  state = {
    buildings: [],
    favorites: [],
    loading: false,
    page: 1,
    total_pages: 0,
    state: '',
    city: '',
  };

  componentDidMount() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    if (favorites) {
      this.setState({ buildings: favorites, favorites });
    }
  }

  componentDidUpdate(_, prevState) {
    const { favorites } = this.state;

    if (prevState.favorites !== favorites) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  decreasePage = e => {
    const { page } = this.state;
    if (page > 1) {
      this.setState({
        page: page - 1,
      });

      this.handleSubmit(e);
    }
  };

  increasePage = e => {
    const { page, total_pages } = this.state;
    if (page < total_pages) {
      this.setState({
        page: page + 1,
      });
      this.handleSubmit(e);
    }
  };

  handleFavorite = id => {
    const { buildings, favorites } = this.state;
    const buildingIndex = buildings.findIndex(building => building.id === id);

    const building = buildings[buildingIndex];

    building.favorite
      ? (building.favorite = false)
      : (building.favorite = true);

    this.setState({
      buildings,
      favorites: [...favorites, building],
    });
  };

  handleUf = e => {
    this.setState({
      state: e.target.value.toUpperCase(),
    });
  };

  handleCity = e => {
    this.setState({
      city: e.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { page, state, favorites, city } = this.state;
    const params = { page };
    this.setState({
      loading: true,
    });

    if (state !== '') params.state = state;

    if (city !== '') params.city = city;

    const response = await api.get('buildings/', {
      headers: {
        Authorization: `bearer ${process.env.REACT_APP_TOKEN}`,
      },
      params,
    });

    const { buildings, total_pages } = response.data;

    let i;
    let j;
    // TODO find a better way to compare the two arrays;
    for (i = 0; i < buildings.length; i++) {
      for (j = 0; j < favorites.length; j++) {
        if (buildings[i].id === favorites[j].id) {
          buildings[i].favorite = true;
        }
      }
    }

    this.setState({
      buildings,
      loading: false,
      total_pages,
      state: '',
      city: '',
    });
  };

  render() {
    const { buildings, loading, page, state, city } = this.state;
    const back = '<';
    const forward = '>';

    if (loading) {
      return (
        <Loading loading={loading}>
          <FaSpinner color="#333" />
        </Loading>
      );
    }
    return (
      <Container>
        <FormContainer>
          <img src={logo} alt="Órulo" />
          <form onSubmit={this.handleSubmit}>
            <CityInput
              placeholder="Cidade"
              value={city}
              onChange={this.handleCity}
            />
            <UfInput placeholder="UF" value={state} onChange={this.handleUf} />
            <SearchButton>Buscar</SearchButton>
          </form>
        </FormContainer>
        <List>
          {buildings.map(building => (
            <li key={String(building.id)}>
              <img src={building.default_image['200x140']} alt="" />
              <div>
                <span>{building.name}</span>
                <p>{building.description}</p>
              </div>
              <FavoriteButton
                type="button"
                onClick={() => this.handleFavorite(building.id)}
              >
                {building.favorite ? (
                  <FaStar color="#FFC507" />
                ) : (
                  <FaRegStar color="#000" />
                )}
              </FavoriteButton>
            </li>
          ))}
        </List>
        <Pagination>
          <button type="button" onClick={this.decreasePage}>
            {back}
          </button>
          {page}
          <button type="button" onClick={this.increasePage}>
            {forward}
          </button>
        </Pagination>
      </Container>
    );
  }
}
