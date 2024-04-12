export default async function isAuth() {
    return fetch('/api/profile', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            if (data.code === '200') {
                return true;
            }
                return false;
        })
        .catch(error => false);
}
