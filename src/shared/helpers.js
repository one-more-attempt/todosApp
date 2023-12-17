export const responseMapper = (response, dynamicKey) => Object.keys(response)
    .map(key => ({ ...response[key], [dynamicKey]: key})); 
