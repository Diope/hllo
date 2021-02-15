import React from 'react';
import {Card, Label, Icon} from 'semantic-ui-react';

export default function PostCard({post}) {
    const { body, createdAt, id, username, likeCount, likes, commentCOunt} = post
    return (
        <Card>
            <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{createdAt}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <p>buttons</p>
            </Card.Content>
        </Card>
    )
}
