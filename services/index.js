import { request, gql } from "graphql-request";;

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        category {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;
    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
}


export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }    
                createdAt
                slug
            }
        }
    `;
    const result = await request(graphqlAPI, query);

    return result.posts;
}


export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {slug_not: $slug, AND: {category_some: { slug_in: $categories }}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;
    try {
        const result = await request(graphqlAPI, query, { slug, categories });
      
        return result.posts;
    } catch (error) {
        console.log(error);
        throw new Error("failed to fetch similar posts");
    }
};


export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;
    const result = await request(graphqlAPI, query);

    return result.categories;
}


export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug : String!) {
            post(where: { slug: $slug }) {
                title
                excerpt
                featuredImage {
                    url
                }
                author {
                    name
                    bio
                    photo {
                        url
                    }
                }
                createdAt
                slug
                content {
                    raw
                }
                category {
                    name
                    slug
                }
            }
        }
    `;
    const result = await request(graphqlAPI, query, { slug });
    return result.post;
}

export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });

    return result.json();
}


export const getComments = async (slug) => {
    const query = gql`
        query GetComments($slug : String!) {
            comments(where: { post : { slug: $slug } }) {
                name
                createdAt
                comment
            }
        }
    `;
    try {
        const result = await request(graphqlAPI, query, { slug });
        return result.comments;
    } catch (error) {
        console.log(error);
        throw new Error("failed to fetch comments");
    }
}
 

export const getFeaturedPosts = async () => {
    const query = gql`
        query GetCategoryPost {
            posts(where: { featuredPost: true }) {
                author {
                    name
                    photo {
                        url
                    }
                }
                featuredImage {
                    url
                }
                title
                slug
                createdAt
            }
        }
    `;
    const result = await request(graphqlAPI, query);
    return result.posts;
}


export const getCategoryPost = async (slug) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: { category_some: { slug: $slug } }) {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        category {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;
    const result = await request(graphqlAPI, query, { slug });
    return result.postsConnection.edges;
}


export const getAdjacentPosts = async (slug, createdAt) => {
    const query = gql`
        query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
            next:posts(
                first: 1
                orderBy: createdAt_ASC
                where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
            ) {
                title
                featuredImage {
                    url
                }    
                createdAt
                slug
            }
            previous:posts(
                first: 1
                orderBy: createdAt_DESC
                where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
            ) {
                title
                featuredImage {
                    url
                }    
                createdAt
                slug
            }
        }
    `;
    const result = await request(graphqlAPI, query, { slug, createdAt });
    return { next: result.next[0], previous: result.previous[0] };
}