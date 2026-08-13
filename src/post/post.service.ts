import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
    async getPosts(id?: string) {
        return await fetch(`https://jsonplaceholder.typicode.com/posts${id ? `/${id}` : ``}`)
            .then(response => response.json())
            .then(data => data);

    }

    async storePost() {
        return await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(data => data);
    }

    async updatePost(id: string) {
        return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: 1,
                title: 'foo updated',
                body: 'bar updated',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(data => data);
    }

    async deletePost(id: string) {
        return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then(data => data);
    }
}
