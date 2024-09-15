// File for the funtions that are being reused in the project


export const get_data = async function (url) {
    try {
        //      'https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8783'
        const response = await fetch(url);

        // Check if the response is ok, if not throw an error
        if (response.status !== 200) {
            throw new Error(
                `Couldn't fetch the recipe data, API status: ${response.status}`
            );
        }
        // Convert the response to JSON to get the recipe data
        const data = await response.json();
        if (data.status !== 'success') {
            throw new Error(`No data found, ${data.message}`);
        }
        return data;
    }
    catch (err) {
        throw new Error(err.message);
    }
};


export const wait = async function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
};
