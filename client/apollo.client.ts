import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";


const link = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GQL_URI,
    // credentials: 'include'
});

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            // nextFetchPolicy: "no-cache",
        },
    },
});


export default client;

