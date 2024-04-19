export default async function checkToken(token: string | null) {
  return fetch(`/api/auth/checkpasswordtoken?token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === '200') {
        return { isValid: true, email: data.email };
      }
      return { isValid: false, email: '' };
    })
    .catch(() => ({ isValid: false }));
}
