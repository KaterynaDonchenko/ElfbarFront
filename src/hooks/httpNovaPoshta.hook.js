export const useHttpNovaPoshta = () => {

    const obj = {
        "apiKey": "732428d3fbb9b42deb3d8dc46b4341e2",
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName" : "ки",
            "Limit" : "1000",
            "Page" : "5"
        }
    }

    const request = async () => {
        try {
            const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Could not fetch, status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            return data;
        } catch(e) {
            throw e;
        }
    };

    return request     
}