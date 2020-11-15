class Firebase {
  doSignInWithEmailAndPassword = async (email, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }

    const response = await fetch(
      'http://localhost:3001/api/admin_only', // TODO Store baseURL in config
      requestOptions
    )

    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message)
    }

    localStorage.setItem('authUser', JSON.stringify(body))
  }

  // Currently not used, but for a real world app, the JWT needs server-side validation for each page load on protected pages
  doValidateIdToken = async () => {
    const authUser = this.getAuthUser()

    if (!authUser) {
      throw new Error('No authUser')
    }

    const { idToken } = authUser

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    }

    const response = await fetch(
      'http://localhost:3001/api/token/verify', // TODO Store baseURL in config
      requestOptions
    )

    if (!response.ok) {
      throw new Error('Invalid idToken')
    }
  }

  doSignOut = () => {
    localStorage.removeItem('authUser')
    window.location = '/signin?redirect=/'
  }

  getAuthUser() {
    return JSON.parse(localStorage.getItem('authUser'))
  }
}

export default Firebase
