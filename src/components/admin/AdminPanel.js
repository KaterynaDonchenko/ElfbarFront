import { Admin, Resource } from 'react-admin';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';

import decoratedCustomDataProvider from '../../dataProvider/dataProvider';
import { checkAuth } from '../loginForm/LoginFormSlice';
import {ProductList, EditProduct, CreateProduct} from './ProductList';
import { fetchLogout } from '../loginForm/LoginFormSlice'; 
import { FilterSlidesList, EditFilterSlide, CreateFilterSlide } from './FilterSlidesList';
import { Dashboard } from './Dashboard';
import { Button } from '@mui/material';

import './adminPanel.scss';

const AdminPanel = () => {
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const {accessToken} = useSelector(state => state.loginForm)
    const dispatch = useDispatch();

    useEffect(() => {
      if (accessToken) {
        dispatch(checkAuth());
      }
    }, []);

    useEffect(() => {
      header.style.display = 'none';
      footer.style.display = 'none';
    }, [])

    const onExid = () => {
      dispatch(fetchLogout());
      header.style.display = 'flex';
      footer.style.display = 'block';
    }

    return (
            <>
              <Button onClick={() => {onExid()}} className='admin__btn' variant="outlined">Вихід</Button>
              <Admin basename="/admin" dataProvider={decoratedCustomDataProvider} dashboard={Dashboard}>
                <Resource options={{ label: 'Товари' }} name="products" list={ProductList} edit={EditProduct} create={CreateProduct} />
                <Resource options={{ label: 'Фільтри' }} name="filterSlides" list={FilterSlidesList} edit={EditFilterSlide} create={CreateFilterSlide}/>
              </Admin>
            </>
    )
}

export default AdminPanel;

