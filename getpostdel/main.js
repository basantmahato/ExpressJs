function fetchUsers() {
    fetch('http://localhost:5000/')
        .then(res => res.json())
        .then(data => {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = '';
            data.forEach(user => {
                if (user) {
                    usersList.innerHTML += `<li>${user.id}: ${user.name} (Roll: ${user.roll})</li>`;
                }
            });
        });
}

fetchUsers(); 
document.getElementById('addUserForm').addEventListener('submit', function(e){
    e.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const roll = document.getElementById('roll').value;

    fetch('http://localhost:5000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Number(id), name, roll: Number(roll) })
    })
    .then(res => res.json())
    .then(() => {
        fetchUsers();
        this.reset();
    });
});

function deleteUser() {
    const id = document.getElementById('deleteId').value;
    fetch('http://localhost:5000/' + id, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        fetchUsers();
        document.getElementById('deleteId').value = '';
    });
}
