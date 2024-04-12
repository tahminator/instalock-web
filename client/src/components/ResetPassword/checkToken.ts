export default async function checkToken(token: string | null) {
    return fetch(`/api/checkpasswordtoken?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === '200') {
            return { isValid: true, email: data.email };
        }
            return { isValid: false };
    })
    .catch(error => {
        console.error('Error checking token:', error);
        return { isValid: false };
    });
}
