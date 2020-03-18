import React, { Component } from 'react';

import api from '../../services/api';

// import { Container } from './styles';

export default class Main extends Component {
  state = {
    buildings: [],
    // favorites: [],
    loading: false,
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      loading: true,
    });

    const response = await api.get('buildings/', {
      headers: {
        Authorization: 'bearer a8vZ5ZYVb9c4TyaPwhKTfx8ilehxmPG6lp86KASiHgU',
      },
      params: {
        state: 'RS',
        per_page: 2,
      },
    });

    this.setState({
      buildings: response.data.buildings,
      loading: false,
    });
  };

  render() {
    const { buildings, loading } = this.state;

    if (loading) {
      return <h1>Carregando</h1>;
    }
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Buscar</button>
        </form>
        <ul>
          {buildings.map(building => (
            <li key={String(building.id)}>{building.name}</li>
          ))}
        </ul>
      </>
    );
  }
}
