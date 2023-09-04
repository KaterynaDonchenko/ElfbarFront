import { withLifecycleCallbacks } from 'react-admin';
import { stringify } from "query-string";
import { v4 as uuidv4 } from 'uuid';


const apiUrl = 'http://solodkiypar.com.ua:3001'; 

const customDataProvider = {

  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
  

    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const response = await fetch(url);

    const data = (await response.json()).map((item) => ({id: item._id, ...item, img: `http://solodkiypar.com.ua:3001/${item.img}`}))
    .map(({_id, ...item}) => item);

    return {
        data: data, 
        total: parseInt((response.headers.get("content-range") || "0").split("/").pop() || 0, 10) 
    };

  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await fetch(url);

    const data = Object.fromEntries(
      Object.entries((await response.json())).map(([key, value]) => (key === '_id' ? ['id', value]: key === 'img' ? 
      [key,  `http://solodkiypar.com.ua:3001/${value}`]: [key, value])));
     
    const image = {id: 1, title: data.img.substring(data.img.lastIndexOf('/') + 1), src: data.img};
    data.image = image;
    return { data: data };
  },

  getMany: async (resource, params) => {
    const url = `${apiUrl}/${resource}?ids=${params.ids.join(',')}`;
    const response = await fetch(url);
    const data = await response.json();
    return { data: data };
  },

  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const srcImg = params.data.name ? 'img/filterSlides' : 'img/products';

    params.data.id = uuidv4();
    params.data.img = `${srcImg}/${params.data.image.title}`;

    const data = Object.fromEntries(Object.entries(params.data).filter(([key, value]) => key !== 'image'));
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const newData = Object.fromEntries(
      Object.entries((await response.json())).map(([key, value]) => (key === '_id' ? ['id', value]: key === 'img' ? 
      [key, `http://solodkiypar.com.ua:3001/${value}`] : [key, value])));

    return { data: newData };
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const srcImg = params.data.name ? 'img/filterSlides' : 'img/products';

    const updateData = Object.fromEntries(
      Object.entries(params.data).map(([key, value]) => (
        key === 'id' ? ['_id', value] : key === 'img' && params.data.image ? [key, `${srcImg}/${params.data.image.title}`] 
        : [key, value]))
    );


    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })

    const data = Object.fromEntries(
      Object.entries((await response.json())).map(([key, value]) => (key === '_id' ? ['id', value]: key === 'img' ? 
      [key, `http://solodkiypar.com.ua:3001/${value}`] : [key, value])))
    ;
    return { data: data };
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        return { data: {} };
      } else {
        throw new Error('Failed to delete resource.');
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
  },

  
  deleteMany: async (resource, params) => {
    const url = `${apiUrl}/${resource}/deleteMany`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ids: params.ids}),
      });
  
      const data = (await response.json()).map((item) => ({id: item._id, ...item})).map(({_id, ...item}) => item);
      if (response.status === 200) {
        return { data:  data};
      } else {
        throw new Error('Failed to delete resources.');
      }
    } catch (error) {
      console.error('Error deleting resources:', error);
      throw error;
    }
  }  

};

// export default customDataProvider;

const decoratedCustomDataProvider = withLifecycleCallbacks(
  customDataProvider,
  [
    { resource: 'products',
      beforeUpdate: async (params, dataProvider) => {

        if (!params.data.image.rawFile) {
          return params;
        }

        const newPictures = params.data.image;

        const transformedNewPictures = await Promise.all([convertFileToBase64(newPictures)]);

        params.data.pictures = transformedNewPictures.map((picture64) => ({
          src: picture64,
          shortSrc: `img/products/${params.data.image.title}`,
          title: `${params.data.image.title}`,
        }));

        return params;
      }
    },
    { resource: 'filterSlides',
      beforeUpdate: async (params, dataProvider) => {

        if (!params.data.image.rawFile) {
          return params;
        }

        const newPictures = params.data.image;

        const transformedNewPictures = await Promise.all([convertFileToBase64(newPictures)]);

        params.data.pictures = transformedNewPictures.map((picture64) => ({
          src: picture64,
          shortSrc: `img/filterSlides/${params.data.image.title}`,
          title: `${params.data.image.title}`,
        }));

        return params;
      }
    },
    { resource: 'products',
      beforeCreate: async (params, dataProvider) => {

        if (!params.data.image.rawFile) {
          return params;
        }

        const newPictures = params.data.image;

        const transformedNewPictures = await Promise.all([convertFileToBase64(newPictures)]);

        params.data.pictures = transformedNewPictures.map((picture64) => ({
          src: picture64,
          shortSrc: `img/products/${params.data.image.title}`,
          title: `${params.data.image.title}`,
        }));

        return params;
      }
    },
    { resource: 'filterSlides',
      beforeCreate: async (params, dataProvider) => {

        if (!params.data.image.rawFile) {
          return params;
        }

        const newPictures = params.data.image;

        const transformedNewPictures = await Promise.all([convertFileToBase64(newPictures)]);

        params.data.pictures = transformedNewPictures.map((picture64) => ({
          src: picture64,
          shortSrc: `img/filterSlides/${params.data.image.title}`,
          title: `${params.data.image.title}`,
        }));

        return params;
      }
    }
  ]);
      

const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
});

export default decoratedCustomDataProvider

// expected: 4541760,
// length: 4541760,
// limit: 102400,
// type: 'entity.too.large'



  