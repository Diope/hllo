import React from 'react';
import {Card, Label, Icon} from 'semantic-ui-react';

export default function PostCard({post}) {
    return (
        <div>
            <h1>{post.username}</h1>
        </div>
    )
}
