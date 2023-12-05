let container = document.getElementById("container");

toggle = () => {
	container.classList.toggle("sign-in");
	container.classList.toggle("sign-up");
};

setTimeout(() => {
	container.classList.add("sign-in");
}, 200);

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyB69eEWphoqifApDH4dXYjTcdlvo_3Hk4s",
	authDomain: "mycastplus.firebaseapp.com",
	databaseURL: "https://mycastplus-default-rtdb.firebaseio.com",
	projectId: "mycastplus",
	storageBucket: "mycastplus.appspot.com",
	messagingSenderId: "450671757980",
	appId: "1:450671757980:web:bcc9cff57bde7943e1fb59",
	measurementId: "G-25CPV72L1T",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
	// Get all our input fields
	email = document.getElementById("email").value;
	password = document.getElementById("password").value;
	full_name = document.getElementById("full_name").value;
	plushashcode = document.getElementById("plushashcode").value;

	// Validate input fields
	if (
		validate_email(email) == false ||
		validate_password(password) == false
	) {
		alert("Email or Password is Outta Line!!");
		return;
		// Don't continue running the code
	}
	if (
		validate_field(full_name) == false ||
		validate_field(plushashcode) == false
	) {
		alert("One or More Extra Fields is Outta Line!!");
		return;
	}

	// Move on with Auth
	auth.createUserWithEmailAndPassword(email, password)
		.then(function () {
			// Declare user variable
			var user = auth.currentUser;

			// Add this user to Firebase Database
			var database_ref = database.ref();

			// Create User data
			var user_data = {
				email: email,
				full_name: full_name,
				plushashcode: plushashcode,
				last_login: Date.now(),
			};

			// Push to Firebase Database
			database_ref.child("users/" + user.uid).set(user_data);

			// DOne
			alert("Usuário cadastrado");
		})
		.catch(function (error) {
			// Firebase will use this to alert of its errors
			var error_code = error.code;
			var error_message = error.message;

			alert(error_message);
		});
}

// Set up our login function
function login() {
	// Get all our input fields
	email = document.getElementById("email").value;
	password = document.getElementById("password").value;

	// Validate input fields
	if (
		validate_email(email) == false ||
		validate_password(password) == false
	) {
		alert("E-mail ou a senha está incorreto");
		return;
		// Don't continue running the code
	}

	auth.signInWithEmailAndPassword(email, password)
		.then(function () {
			// Declare user variable
			var user = auth.currentUser;

			// Add this user to Firebase Database
			var database_ref = database.ref();

			// Create User data
			var user_data = {
				last_login: Date.now(),
			};

			// Push to Firebase Database
			database_ref.child("users/" + user.uid).update(user_data);

			// DOne
			alert("Usuário Logou!!");
			window.location.href = "./home.html"; // Redireciona para index2.html
		})
		.catch(function (error) {
			// Firebase will use this to alert of its errors
			var error_code = error.code;
			var error_message = error.message;

			alert(error_message);
		});
}

// Validate Functions
function validate_email(email) {
	expression = /^[^@]+@\w+(\.\w+)+\w$/;
	if (expression.test(email) == true) {
		// Email is good
		return true;
	} else {
		// Email is not good
		return false;
	}
}

function validate_password(password) {
	// Firebase only accepts lengths greater than 6
	if (password < 6) {
		return false;
	} else {
		return true;
	}
}

function validate_field(field) {
	if (field == null) {
		return false;
	}

	if (field.length <= 0) {
		return false;
	} else {
		return true;
	}
}
