module.exports = (
    { name }, // user data
    { city, street, number, apartment }, // address data
    offers,
    distanceFromStore
    ) => {
    const date = new Date();
    let address = `${ number } ${street}, ${city}`;
    if (apartment) address += ` (apartment ${apartment})`;
    
    const offerList = offers.reduce((str, { offer, quantity }, i) => {
        const { ingredients, title } = offer;
        const ingredientList = ingredients.reduce((prev, { name, share }, index) => (
            `${prev} \n    ${index + 1}. ${name} (${share}%)`
        ), '');
        const quan = quantity > 1 ? ` (x${quantity})` : ''
        return `${str} \n\n offer number ${i + 1}: ${title}${quan} \n ${ingredientList}`;
    }, '')

    return `
${ name } ordered a new offer

${offerList}

plase ship to ${address} (${distanceFromStore} km away)
order created at ${date.toLocaleTimeString()}, ${date.toDateString()}
    `
}