import React from 'react';
import {Card, Label, Icon} from 'semantic-ui-react';

export default function PostCard({post}) {
    return (
        <div>
            <h1>{post.createdAt}</h1>
        </div>
    )
}
