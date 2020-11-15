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

  doValidateIdToken = async () => {
    const authUser = JSON.parse(localStorage.getItem('authUser'))

    if (!authUser) {
      throw new Error('doValidateIdToken.no auth user')
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
    window.location = '/signin'
  }
  // getAuthUser = () =>
  //   new Promise((resolve, reject) => {
  //     if (this.authUser) {
  //       return resolve(this.authUser)
  //     }

  //     this.auth.onAuthStateChanged(async (authUser) => {
  //       if (authUser) {
  //         // const profile = await this.getUserProfile(authUser.uid)
  //         this.authUser = new UserModel(authUser)
  //         resolve(this.authUser)
  //       } else {
  //         reject('User not logged in')
  //       }
  //     })
  //   })

  // onAuthUserListener = (next, fallback) =>
  //   this.auth.onAuthStateChanged(async (authUser) => {
  //     if (authUser) {
  //       // const profile = await this.getUserProfile(authUser.uid)
  //       this.authUser = new UserModel(authUser)
  //       next(this.authUser)
  //     } else {
  //       fallback()
  //     }
  //   })
}

export default Firebase
