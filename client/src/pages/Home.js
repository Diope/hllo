import React from 'react';
import {useQuery} from '@apollo/client/react/hooks';
import gql from 'graphql-tag'

export default function Home() {
    const {loading, data: {getPosts: posts}} = useQuery(FETCH_POSTS_QUERY);

    if (data) {
        console.log(data);
    }
    return (
        <div>
            Home
        </div>
    )
}

const FETCH_POSTS_QUERY = gql`
{
    getPosts{
        id body createdAt username likeCount
        likes {
            username
        }
        commentCount
        comments {
            id username createdAt body
        }
    }
}
`