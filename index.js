fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json()).then((data) => showPosts(data));

//Add post data
document.querySelector('#form-add-post').addEventListener('submit', (e) => {
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: document.querySelector('#txt-title').value,
            body: document.querySelector('#txt-body').value,
            userId: 1
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        alert('Successfully added.')

        document.querySelector('#txt-title').value = null;
        document.querySelector('#txt-body').value = null;
    })
})

//Show posts
const showPosts = (posts) => {
    let postEntries = '';

    posts.forEach((post) => {
        postEntries += `
            <div id="post-${post.id}">
                <h3 id="post-title-${post.id}">${post.title}</h3>
                <p id="post-body-${post.id}">${post.body}</p>
                <button onclick="editPost('${post.id}')">Edit</button>
                <button onclick="deletePost('${post.id}')">Delete</button>
            </div>
        `;
    })

    document.querySelector('#div-post-entries').innerHTML = postEntries;
}
//Edit post
const editPost = (id) => {
    let title = document.querySelector(`#post-title-${id}`).innerHTML;
    let body = document.querySelector(`#post-body-${id}`).innerHTML;

    document.querySelector('#txt-edit-id').value = id;
    document.querySelector('#txt-edit-title').value = title;
    document.querySelector('#txt-edit-body').value = body;
    document.querySelector('#btn-submit-update').removeAttribute('disabled');
}
//Update post
document.querySelector('#form-edit-post').addEventListener('submit', (e) => {
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
            id: document.querySelector('#txt-edit-id').value,
            title: document.querySelector('#txt-edit-title').value,
            body: document.querySelector('#txt-edit-body').value,
            userId: 1
        }),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        alert('Successfully updated.');

        document.querySelector('#txt-edit-id').value = null;
        document.querySelector('#txt-edit-title').value = null;
        document.querySelector('#txt-edit-body').value = null;
        document.querySelector('#btn-submit-update').setAttribute('disabled', true);
    })
})

//Delete post

const deletePost = (id) => {
    document.querySelector(`#post-${id}`).remove();
}