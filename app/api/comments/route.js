import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export async function POST(req) {
    const { name, email, comment, slug } = await req.json();  // Parse JSON payload

    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${graphcmsToken}`,
        },
    });

    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
            createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { id }
        }
    `;

    try {
        const result = await graphQLClient.request(query, { name, email, comment, slug });
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('GraphQL request error:', error);  // Log the error for debugging
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });  // Return error message as JSON
    }
}
