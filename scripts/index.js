import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove, set, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://management-system-a81dd-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const formSignUpEl = document.getElementById('form-sign-up')

formSignUpEl.addEventListener('submit', signUpUser)

function signUpUser(e) {
  e.preventDefault();
  const newUserFormData = new FormData(formSignUpEl)
  // Getting Form Data 
  const email = newUserFormData.get('email')
  const userName = newUserFormData.get('user-name')
  const password = newUserFormData.get('password')
// Making the user ID
  const userID = email.slice( 0, email.indexOf('@') )
  // Setting the reference of Database and pushing the Signup Info
  const usersInDB = ref(database, `/users/${userID}`)

  set( usersInDB, {
    email: email,
    name: userName,
    password: password
  })
  
  document.getElementById('sign-up-heading').textContent = `You are Registered`

  setTimeout(() => {
    document.getElementById('sign-up-heading').textContent = `Sign Up`
    formSignUpEl.reset()
}, 3000)
}

