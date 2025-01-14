export const useHttpArray = () => {
    
    const arrayOfRequests = async (arr, language, url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        const urlArray = arr.map(id => `${url}/${id}?language=${language}`);

        try {
            const responses = await Promise.all(urlArray.map(url => fetch(url, { method, body, headers })));
                // if (!responses.ok) throw new Error(`Could not fetch ${url}, status: ${responses.status}`);

            const data = await Promise.all(responses.map(response => response.json()));
            return data;
        } catch (error) {
            throw error;
        }
        
    };

    return arrayOfRequests
}

