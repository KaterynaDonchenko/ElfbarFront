export const useHttpNovaPoshta = () => {

    const getBodyRequest = (marker, value) => {
        switch (marker) {
            case 'city':
                return {
                    apiKey: "732428d3fbb9b42deb3d8dc46b4341e2",
                    modelName: "Address",
                    calledMethod: "searchSettlements",
                    methodProperties: {
                        CityName: value,
                        Limit: "100",
                        Page: "1"
                    }
                }
            case 'warehouse':
                return {
                    apiKey: "732428d3fbb9b42deb3d8dc46b4341e2",
                    modelName: "Address",
                    calledMethod: "getWarehouses",
                    methodProperties: {
                        CityRef: value
                    }
                }    
            default:
                break;
        }
    }

    const request = async (marker, value) => {
        try {
            const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
                method: 'POST',
                body: JSON.stringify(getBodyRequest(marker, value)),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Could not fetch, status: ${response.status}`);
            }

            const data = await response.json();

            return data;

        } catch(e) {

            throw e;
        }
    };

    const _transformCities = (city) => {
        return {
            city: city.Present,
            cityRef: city.DeliveryCity 
        }
    }

    const _transformWarehouses = (warehouses) => {
        return {
            warehouses: warehouses.Description,
        }
    }

    const getCities = async (marker, city) => {
        const res = await request(marker, city);
        return res.data[0].Addresses.map(_transformCities);
    }

    const getWarehouses = async (marker, cityRef) => {
        const res = await request(marker, cityRef);
        return res.data.map(_transformWarehouses);
    }

    return { getCities, getWarehouses }     
}