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

//Update post

//Delete post