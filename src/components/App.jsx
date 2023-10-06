import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import PixabayAPI from '../api/pixabayAPI'

import 'react-toastify/dist/ReactToastify.min.css';

export class App extends Component {
  state = {
    searchQuery: '',
    searchData: null,
  };

  apiService = new PixabayAPI();  // Создаем экземпляр PixabayAPI

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    this.apiService.query = searchQuery;
    this.fetchData();
  };

  fetchData = async () => {
    try {
      const data = await this.apiService.fetchSearch();
      this.setState({ searchData: data });
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  };

  render() {
    const { searchQuery, searchData } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} searchData={searchData} />
        <ToastContainer />
      </>
    );
  }
}