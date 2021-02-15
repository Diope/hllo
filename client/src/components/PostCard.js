import React from 'react';
import {Card, Label, Image} from 'semantic-ui-react';

export default function PostCard({post}) {
    const { body, createdAt, id, username, likeCount, likes, commentCOunt} = post
    return (
        <Card>
            <Card.Content>
                <Image floated="left" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
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
