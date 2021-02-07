module.exports = (
    { name }, // user data
    { city, street, number, apartment }, // address data
    { title, ingredients }, // offer data
    { calcDistance } // store data
    ) => {
    const date = new Date();
    let address = `${ number } ${street}, ${city}`;
    if (apartment) address += ` (apartment ${apartment})`;
    const distanceFromStore = Math.round((calcDistance * 10) / 1000) / 10
    
    const ingredientList = ingredients.reduce((prev, { name, share }, index) => (
        `${prev} \n    ${index + 1}. ${name} (${share}%)`
    ), '');

    return `
    ${ name } ordered a new offer


    offer details:
    ${title}
    ingredients: 
    ${ingredientList}
    

    plase ship to ${address} (${distanceFromStore} km away)
    order created at ${date.toLocaleTimeString()}, ${date.toDateString()}
    `
}