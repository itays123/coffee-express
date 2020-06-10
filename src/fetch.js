const sendRequest = (body, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return fetch('http://localhost:8000/api', {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(body)
    })
}

export const fetchLogin = (email, password) => {
    const body = {
        query: `
            query {
                login(email: "${email}", password: "${password}"){
                    token
                    user {
                        name
                        address {
                            city
                            street
                            number
                            apartment
                        }
                        lastOffers
                    }
                }
            }
        `
    }
    return sendRequest(body);
}

export const fetchSignup = (email, password, name, { city, street, number, apartment } = { city: null, street: null, number: null, apartment: null }) => {
    const apartmentQuery = apartment ? `, apartment: "${apartment}"` : ''
    const address = city ? `, address: { city: "${city}", street: "${street}", number: "${number}"${apartmentQuery}}` : '';
    const body = {
        query: `
            mutation {
                signup(email: "${email}", password: "${password}", name: "${name}"${address}){
                    token
                    user {
                        name
                        address {
                            city
                            street
                            number
                            apartment
                        }
                    }
                }
            }
        `
    }
    return sendRequest(body);
}

export const fetchChangePassword = (token, newPassword) => {
    const body = {
        query: `
            mutation {
                changePassword(password: "${newPassword}") {
                    email
                }
            }
        `
    }
    return sendRequest(body, token);
}

export const fetchChangeAddress = (token, { city, street, number, apartment }) => {
    const apartmentQuery = apartment ? `, apartment: "${apartment}"` : '';
    const address = `{city: "${city}", street: "${street}", number: "${number}"${apartmentQuery}}`
    const body = {
        query: `
            mutation {
                changeAddress(address: ${address}) {
                    address {
                        city
                        street
                        number
                        apartment
                    }
                }
            }
        `
    }
    return sendRequest(body, token);
}

export const fetchForgotPassword = (email) => {
    const body = {
        query: `
            query {
                forgotPassword(email: "${email}")
            }
        `
    }
    return sendRequest(body);
}

export const fetchContact = (rating, review = 'Empty review', name = 'Anonymous') => {
    const body = {
        query: `
            query {
                contact(rating: ${rating}, review: "${review}", name: "${name}")
            }
        `
    }
    return sendRequest(body);
}

export const fetchOffers = () => {
    const body = {
        query: `
            query {
                offers {
                    id
                    title
                    createdAt
                    ingrediants {
                        share
                        name
                    }
                }
            }
        `
    }
    return sendRequest(body);
}

export const fetchOrder = (token, offerId, { city, street, number, apartment }) => {
    const body = {
        query: `
            mutation {
                order(offerId: "${offerId}", address: {city: "${city}", street: "${street}", number: "${number}", apartment: ${apartment}}) {
                    email
                }
            }
        `
    }
    return sendRequest(body, token);
}

export const fetchOrderMany = (token, cart, { city, street, number, apartment }) => {
    const apartmentStr = apartment ? `, apartment: "${apartment}"` : '';
    const address = `{city: "${city}", street: "${street}", number: "${number}"${apartmentStr}}`
    const ids = cart.map(cartItem => cartItem.item.id);
    const quants = cart.map(cartItem => cartItem.quantity);

    const requestBody = {
        query: `
            mutation orderCart($ids: [ID!]!, $quants: [Int!]!) {
                orderMany(offerIds: $ids, quantities: $quants, address: ${address})
            }
        `,
        variables: { ids, quants }
    }

    return sendRequest(requestBody, token);
}