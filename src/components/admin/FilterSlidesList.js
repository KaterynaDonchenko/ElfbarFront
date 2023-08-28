import { List, 
         Datagrid, 
         TextField, 
         ImageField, 
         EditButton, 
         SimpleForm, 
         TextInput, 
         ImageInput, 
         NumberInput,
         useEditController,
         useInput,
         SaveButton,
         DeleteButton,
         useCreateController,
         SearchInput} from "react-admin";
import { SketchPicker } from 'react-color';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResettableTextField, FieldTitle, InputHelperText} from "react-admin";
import clsx from 'clsx';
import { Typography, Box } from '@mui/material';

const filters = [
    <SearchInput source="name" alwaysOn/>
]

export const FilterSlidesList = (props) => {
    return (
        <List {...props} filters={filters} className='filterSlides-table'>
            <Datagrid rowClick="edit">
                <div className="check"></div>
                <TextField source="name" />
                <div className="name">Назва</div>
                <ImageField source="img" title="name"/>
                <div className="img">Фото</div>
                <TextField source="color" />
                <div className="img">Колір</div>
                <TextField source="dscr" />
                <div className="dscr">Опис</div>
                <TextField source="info.strength" />
                <div className="strength">Міцність</div>
                <TextField source="info.smoke" />
                <div className="smoke">Кількість затяжок</div>
                <TextField source="info.liquid" />
                <div className="liquid">Об'єм рідини</div>
                <TextField source="info.battery" />
                <div className="battery">Батарея</div>
                <TextField source="additionalInfo" />
                <div className="additionalInfo">Додаткова інформація</div>
                <EditButton/>
            </Datagrid>
        </List>
    )
}

export const EditFilterSlide = () => {
    const {id} = useParams();
    const { record, save, isLoading } = useEditController({ resource: 'filterSlides', id });
    const [color, setColor] = useState('');

    useEffect(() => {
        if (record) {
          setColor(record.color || ''); 
        }
      }, [record]);

    const handleChangeColor = (newColor) => {
        setColor(newColor.hex);
        if (record) {
            record.color = newColor.hex;
        };  
    }

    const changeColorInMyComponent = (newColor) => {
        setColor(newColor);
        if (record) {
            record.color = newColor;
        }; 
    }

    if (isLoading) return null;

    return (
        <>
            <SimpleForm record={record} onSubmit={save} toolbar={<CustomButtons/>}>
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <Typography variant="h6" gutterBottom>
                            Головна інформація
                        </Typography>
                        <TextInput source="name" isRequired fullWidth/>
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <TextInput source="info.strength" fullWidth/>
                            </Box>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <NumberInput source="info.smoke" fullWidth/>
                            </Box>
                        </Box>
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <TextInput source="info.liquid" fullWidth/>
                            </Box>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <TextInput source="info.battery" fullWidth/>
                            </Box>
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            Додаткова інформація
                        </Typography>
                        <TextInput source="dscr" fullWidth multiline/>
                        <TextInput source="additionalInfo" fullWidth multiline/>
                    </Box>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <Typography variant="h6" gutterBottom>
                            Фото фільтру
                        </Typography>
                        <ImageInput source="image">
                            <ImageField source="src" title="name"/>
                        </ImageInput>
                        <hr/>
                        <Typography variant="h6" gutterBottom>
                            Колір фільтру
                        </Typography>
                        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                                <MyComponent source="color" changeColorInMyComponent={changeColorInMyComponent}/>
                            </Box>
                            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                            <SketchPicker color={color} onChange={handleChangeColor}/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </SimpleForm>
        </>
    )
}


const CustomButtons = () => {
    return (
        <div className="btn-group" style={{'padding': '10px 12px', 'backgroundColor': '#f5f5f5'}}>
            <SaveButton alwaysEnable/>
            <DeleteButton/>
        </div>
    );
};

const MyComponent = (props) => {
    const {
        className,
        defaultValue,
        label,
        format,
        helperText,
        onBlur,
        onChange,
        parse,
        resource,
        validate,
        source,
        changeColorInMyComponent,
        color,
        ...rest
    } = props;
    const {
        field,
        fieldState: { error, invalid, isTouched },
        formState: { isSubmitted },
        id,
        isRequired
    } = useInput({
        defaultValue,
        format,
        parse,
        resource,
        source,
        type: 'text',
        validate,
        onBlur,
        onChange,
        ...rest,
    });

    return (
        <ResettableTextField
            id={id}
            {...field}
            className={clsx('ra-input', `ra-input-${source}`, className)}
            label={
                label !== '' && label !== false ? (
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />
                ) : null
            }
            onChange={e => {
                changeColorInMyComponent(e.target.value);
                
            }}
            error={(isTouched || isSubmitted) && invalid}
            helperText={
                <InputHelperText
                    touched={isTouched || isSubmitted}
                    error={error?.message}
                    helperText={helperText}
                />
            }
        />
    );
};

export const CreateFilterSlide = () => {
    const { save} = useCreateController({ resource: 'filterSlides' });
    const [color, setColor] = useState('#fff');


    const handleChangeColor = (newColor) => {
        setColor(newColor.hex);
    }

    const changeColorInMyComponent = (newColor) => {
        setColor(newColor);
    }

    return (
        <SimpleForm onSubmit={save} toolbar={<SaveButton alwaysEnable/>} record={{color: color}}>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <Typography variant="h6" gutterBottom>
                        Головна інформація
                    </Typography>
                    <TextInput source="name" isRequired fullWidth/>
                    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                            <TextInput source="info.strength" fullWidth/>
                        </Box>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                            <NumberInput source="info.smoke" fullWidth/>
                        </Box>
                    </Box>
                    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                            <TextInput source="info.liquid" fullWidth/>
                        </Box>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                            <TextInput source="info.battery" fullWidth/>
                        </Box>
                    </Box>
                    <Typography variant="h6" gutterBottom>
                        Додаткова інформація
                    </Typography>
                    <TextInput source="dscr" fullWidth multiline/>
                    <TextInput source="additionalInfo" fullWidth multiline/>
                </Box>
                <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                    <Typography variant="h6" gutterBottom>
                        Фото фільтру
                    </Typography>
                    <ImageInput source="image">
                        <ImageField source="src" title="name"/>
                    </ImageInput>
                    <hr/>
                    <Typography variant="h6" gutterBottom>
                        Колір фільтру
                    </Typography>
                    <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                            <MyComponent source="color" changeColorInMyComponent={changeColorInMyComponent}/>
                        </Box>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <SketchPicker color={color} onChange={handleChangeColor}/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </SimpleForm>
    )
}


  