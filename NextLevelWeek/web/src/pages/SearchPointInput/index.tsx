import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
interface Props {
  message?: string
};

interface UF {
  id: number;
  nome: string;
  sigla: string;
}

interface City {
  id: number;
  nome: string;
  sigla: string;
}

const SearchPoints = () => {

  const [searchPage, setSearchPage] = useState(false);

  const [uf, setUF] = useState<UF[]>([]);
  const [city, setCity] = useState<City[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const history = useHistory();

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => {
        setUF(response.data);
      })
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        setCity(response.data);
      })
  }, [selectedUf]);

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }
  function handleSearch(event: FormEvent) {
    event.preventDefault();
    setSearchPage(true);
  }
  function handleHome(event: FormEvent) {
    event.preventDefault();
    setSearchPage(false);
    history.push('/');
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const points = await api.get('/points', {
      params: {
        city: selectedCity,
        uf: selectedUf
      }
    });

    const filteredPoints = points.data;

    console.log('points_api: ', filteredPoints);

    // history.push('/search-result', { filteredPoints });

  }


  return (
    <div id="search-point">
      {searchPage ? alert('Search page') : null}

      <form onSubmit={handleSubmit}>

        <span>
          <strong>
            Pontos de Coleta
        </strong>
          <fieldset>
            <div className="field">
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectedUf}
              >
                <option value="0">Selecione uma UF</option>
                {
                  uf.map(item => (
                    <option key={item.sigla} value={item.sigla}>{`${item.sigla} - ${item.nome}`}</option>
                  ))
                }
              </select>
            </div>
            <div className="field">
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectedCity}
              >
                <option value="0">Selecione uma Cidade</option>
                {
                  city.map(item => (
                    <option key={item.nome} value={item.nome}>{item.nome}</option>
                  ))
                }
              </select>
            </div>
          </fieldset>
          <button type="submit" onSubmit={handleSearch}>Buscar</button>
          <button type="button" onClick={handleHome}>Voltar</button>
        </span>

      </form>
    </div>
  );
}

export default SearchPoints;