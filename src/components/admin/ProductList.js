import { List, 
         Datagrid, 
         TextField, 
         ImageField, 
         EditButton, 
         Edit, 
         SimpleForm, 
         TextInput, 
         ImageInput, 
         Create, 
         SelectInput,
         AutocompleteInput,
         SearchInput,
         NumberInput,
         useRecordContext} from "react-admin";
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { Typography, Box } from '@mui/material';

const quantity = [
    {id: 'Є в наявності', name: 'Є в наявності'}, 
    {id: 'Нема в наявності', name: 'Нема в наявності'}
]
const lable = [
    {id: 'новинка', name: 'новинка'}, 
    {id: 'топ', name: 'топ'}
]


export const ProductList = (props) => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);                                        
    const request = useHttp();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await request('http://solodkiypar.com.ua:3001/filterSlides/allCategory');
                setCategory(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, [])

    const productFilters = [
        <SearchInput source="title" alwaysOn />,
        <NumberInput label="price" source="price" defaultValue="" />,
        <SelectInput label="quantity" source="quantity" choices={quantity}/>,
        <TextInput label="taste" source="taste" defaultValue="" />,
        <TextInput label="lable" source="lable" defaultValue="" />,
        <AutocompleteInput label="category" source="category" choices={category} isLoading={loading} />
    ];

    return (
        <List {...props} filters={productFilters} className='product-table'>
            <Datagrid rowClick="edit">
                <div className="check"></div>
                <TextField source="title"/>
                <div className="name">Назва</div>
                <TextField source="price"/>
                <div className="price">Ціна</div>
                <TextField source="taste"/>
                <div className="taste">Смак</div>
                <TextField source="quantity"/>
                <div className="quantity">Наявність</div>
                <ImageField source="img" title="title"/>
                <div className="img">Фото</div>
                <TextField source="lable"/>
                <div className="lable">Відмітка</div>
                <TextField source="category"/>
                <div className="category">Категорія</div>
                <TextField source="dscr"/>
                <div className="dscr">Опис</div>
                <EditButton/>
            </Datagrid>
        </List>
    )
}

const PostTitle = () => {
      const record = useRecordContext();
      return <span>{record ? `${record.title}` : ''}</span>;
};

export const EditProduct = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);                                        
    const request = useHttp();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await request('http://solodkiypar.com.ua:3001/filterSlides/allCategory');
                setCategory(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, [])


    return (
        <Edit title={<PostTitle/>}>
            <SimpleForm>
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <Typography variant="h6" gutterBottom>
                            Головна інформація
                        </Typography>
                        <TextInput source="title" isRequired fullWidth/>
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <TextInput source="taste" isRequired fullWidth/>
                            </Box>
                            <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                <TextInput source="price" isRequired fullWidth/>
                            </Box>
                        </Box>
                        <SelectInput source="quantity" choices={quantity} isRequired fullWidth/>
                    </Box>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <Typography variant="h6" gutterBottom>
                            Фото товару
                        </Typography>
                        <ImageInput source="image">
                            <ImageField source="src" title="title"/>
                        </ImageInput>
                    </Box>
                </Box>
                <hr/>
                <Typography variant="h6" gutterBottom>
                    Додаткова інформація
                </Typography>
                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                        <SelectInput source="lable" choices={lable} fullWidth/>
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                        <AutocompleteInput source="category" choices={category} isLoading={loading} isRequired fullWidth/>
                    </Box>
                </Box>
                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <TextInput source="dscr" fullWidth multiline/>
                </Box>
            </SimpleForm>
        </Edit>
    )
}

export const CreateProduct = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);                                        
    const request = useHttp();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await request('http://solodkiypar.com.ua:3001/filterSlides/allCategory');
                setCategory(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, [])
    
    return (
        <Create>
            <SimpleForm>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <Typography variant="h6" gutterBottom>
                            Головна інформація
                        </Typography>
                        <TextInput source="title" isRequired fullWidth/>
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <TextInput source="taste" isRequired fullWidth/>
                            </Box>
                            <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                                <TextInput source="price" isRequired fullWidth/>
                            </Box>
                        </Box>
                        <SelectInput source="quantity" choices={quantity} isRequired fullWidth/>
                    </Box>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <Typography variant="h6" gutterBottom>
                            Фото товару
                        </Typography>
                        <ImageInput source="image">
                            <ImageField source="src" title="title"/>
                        </ImageInput>
                    </Box>
                </Box>
                <hr/>
                <Typography variant="h6" gutterBottom>
                    Додаткова інформація
                </Typography>
                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                        <SelectInput source="lable" choices={lable} fullWidth/>
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                        <AutocompleteInput source="category" choices={category} isLoading={loading} isRequired fullWidth/>
                    </Box>
                </Box>
                <Box display={{ xs: 'block', sm: 'flex', width: '50%' }}>
                    <TextInput source="dscr" fullWidth/>
                </Box>
            </SimpleForm>
        </Create>
    )
}
