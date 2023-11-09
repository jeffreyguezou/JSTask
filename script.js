let addedPlayers = [];
let searchTerm;
let filterValue;
let isEdit = false;
let editID;
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const genderInput = document.querySelector("#gender");
const sportTypeInput = document.querySelector("#sportType");
const sportInput = document.querySelector("#sport");
const profileInput = document.querySelector("#profile");
const previewImg = document.querySelector("#previewImg");
const newImgLabel = document.querySelector("#newImgLabel");
newImgLabel.hidden = true;
previewImg.hidden = true;
let profileEdited = false;

function Player(name, age, gender, sportType, sport, profileURL) {
  this.id = Math.floor(Math.random() * 100);
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.sportType = sportType;
  this.sport = sport;
  this.profileURL = profileURL;
}

let submitBtn = document.querySelector("#submitBtn");
const playerSection = document.querySelector(".playersSection");

//validation variables
const nameError = document.querySelector("#nameError");
const ageError = document.querySelector("#ageError");
const genderError = document.querySelector("#genderError");
const sportTypeError = document.querySelector("#sportTypeError");
const sportError = document.querySelector("#sportError");
const profileError = document.querySelector("#profileError");

//Error Messages
nameError.hidden = true;
ageError.hidden = true;
genderError.hidden = true;
sportTypeError.hidden = true;
sportError.hidden = true;
profileError.hidden = true;

const clearFormHandler = () => {
  nameInput.value = "";
  ageInput.value = "";
  genderInput.value = "";
  sportTypeInput.value = "";
  sportInput.value = "";
  nameInput.disabled = false;
  profileInput.value = "";
  //document.querySelector("#filterField").value = "all";
  //Remove error styling
  nameInput.classList.remove("errorInput");
  ageInput.classList.remove("errorInput");
  genderInput.classList.remove("errorInput");
  sportTypeInput.classList.remove("errorInput");
  sportInput.classList.remove("errorInput");
  profileInput.classList.remove("errorInput");
  //Hide error messages
  nameError.hidden = true;
  ageError.hidden = true;
  genderError.hidden = true;
  sportTypeError.hidden = true;
  sportError.hidden = true;
  profileError.hidden = true;
  previewImg.hidden = true;
  newImgLabel.hidden = true;
  profileInput.hidden = false;
  isEdit = false;
};

//To change options in Sport DropDown based on value selected in Type dropdown
const sportTypeDropDown = sportTypeInput;

const displaySportDropdownHandler = () => {
  const INDOOR_GAMES = [
    "Chess",
    "Carrom",
    "Snooker",
    "Badminton",
    "Table Tennis",
  ];
  const OUTDOOR_GAMES = [
    "Cricket",
    "Football",
    "Volleyball",
    "Tennis",
    "Rugby",
  ];
  sportInput.innerHTML = ""; //Clear existing nodes to enable multiple changes without stacking Options
  const placeHolderOption = document.createElement("option");
  placeHolderOption.selected = true;
  placeHolderOption.hidden = true;
  placeHolderOption.disabled = true;
  placeHolderOption.text = "Select Here";
  placeHolderOption.value = "";
  sportInput.appendChild(placeHolderOption);

  if (sportTypeDropDown.value == "indoor") {
    INDOOR_GAMES.map((game) => {
      var option = document.createElement("option");
      option.value = game;
      option.text = game;
      sportInput.appendChild(option);
    });
  }
  if (sportTypeDropDown.value == "outdoor") {
    OUTDOOR_GAMES.map((game) => {
      var option = document.createElement("option");
      option.value = game;
      option.text = game;
      sportInput.appendChild(option);
    });
  }
};

sportTypeDropDown.addEventListener("input", displaySportDropdownHandler);

profileInput.addEventListener("input", () => {
  newImgLabel.hidden = true;
  profileInput.hidden = false;
  previewImg.hidden = true;
  if (isEdit) {
    profileEdited = true;
  }
});
const submitHandler = () => {
  let enteredName = nameInput.value;
  let enteredAge = ageInput.value;
  let enteredGender = genderInput.value;
  let enteredSportType = sportTypeInput.value;
  let enteredSport = sportInput.value;

  //convert image to base64

  let enteredProfile = profileInput;
  let URL;
  const reader = new FileReader();
  const getProfile = () => {
    reader.readAsDataURL(enteredProfile.files[0]);
    reader.addEventListener("load", (event) => {
      URL = event.target.result;
    });
  };
  if (profileInput.value != "") {
    getProfile();
  }

  let nameInvalid = false;
  let ageInvalid = false;
  let genderInvalid = false;
  let sportTypeInvalid = false;
  let sportInvalid = false;
  let profileInvalid = false;
  // Validation Checker
  const checkValidation = () => {
    const nameValidation = () => {
      let regex = /\d/g;

      if (regex.test(enteredName) || enteredName.length == 0) {
        nameInvalid = true;
      }
    };
    const ageValidation = () => {
      if (+enteredAge === NaN || +enteredAge === 0 || enteredAge == "") {
        ageInvalid = true;
      }
    };
    const genderValidation = () => {
      if (enteredGender == "") {
        genderInvalid = true;
      }
    };
    const sportTypeValidation = () => {
      if (enteredSport == "") {
        sportTypeInvalid = true;
      }
    };
    const sportValidation = () => {
      if (enteredSportType == "") {
        sportInvalid = true;
      }
    };
    const profileValidation = () => {
      if (enteredProfile.value == "") {
        profileInvalid = true;
      }
    };
    nameValidation();
    ageValidation();
    genderValidation();
    sportTypeValidation();
    sportValidation();
    if (!isEdit) {
      profileValidation();
    }
  };
  checkValidation();

  const displayError = () => {
    if (nameInvalid) {
      nameInput.classList.add("errorInput");
      nameError.hidden = false;
    }
    if (ageInvalid) {
      ageInput.classList.add("errorInput");
      ageError.hidden = false;
    }
    if (genderInvalid) {
      genderInput.classList.add("errorInput");
      genderError.hidden = false;
    }
    if (sportTypeInvalid) {
      sportTypeInput.classList.add("errorInput");
      sportTypeError.hidden = false;
    }
    if (sportInvalid) {
      sportInput.classList.add("errorInput");
      sportError.hidden = false;
    }
    if (profileInvalid) {
      profileInput.classList.add("errorInput");
      profileError.hidden = false;
    }
  };

  const removeErrorStyle = () => {
    nameInput.classList.remove("errorInput");
    ageInput.classList.remove("errorInput");
    genderInput.classList.remove("errorInput");
    sportTypeInput.classList.remove("errorInput");
    sportInput.classList.remove("errorInput");
  };
  nameInput.addEventListener("input", () => {
    nameInput.classList.remove("errorInput");
    nameError.hidden = true;
  });
  ageInput.addEventListener("input", () => {
    ageInput.classList.remove("errorInput");
    ageError.hidden = true;
  });
  genderInput.addEventListener("input", () => {
    genderInput.classList.remove("errorInput");
    genderError.hidden = true;
  });
  sportTypeInput.addEventListener("input", () => {
    sportTypeInput.classList.remove("errorInput");
    sportTypeError.hidden = true;
  });
  sportInput.addEventListener("input", () => {
    sportInput.classList.remove("errorInput");
    sportError.hidden = true;
  });
  profileInput.addEventListener("input", () => {
    profileInput.classList.remove("errorInput");
    profileError.hidden = true;
  });

  if (
    !nameInvalid &&
    !ageInvalid &&
    !genderInvalid &&
    !sportTypeInvalid &&
    !sportInvalid &&
    !profileInvalid
  ) {
    if (!isEdit) {
      setTimeout(() => {
        let newPlayer = new Player(
          enteredName,
          enteredAge,
          enteredGender,
          enteredSportType,
          enteredSport,
          URL
        );

        addPlayer(newPlayer);
        toBeDisplayed();
        clearFormHandler();
        removeErrorStyle();
      }, 100);
    } else if (isEdit) {
      let editIndex = addedPlayers.findIndex((player) => player.id == editID);

      setTimeout(() => {
        addedPlayers[editIndex].name = enteredName;
        addedPlayers[editIndex].age = enteredAge;
        addedPlayers[editIndex].gender = enteredGender;
        addedPlayers[editIndex].sportType = enteredSportType;
        addedPlayers[editIndex].sport = enteredSport;
        if (profileEdited) {
          addedPlayers[editIndex].profileURL = URL;
        }

        toBeDisplayed();

        isEdit = false;
        profileEdited = false;
        clearFormHandler();
      }, 100);
    }
  } else displayError();
};
submitBtn.addEventListener("click", submitHandler);
const addPlayer = (newPlayer) => {
  addedPlayers.push(newPlayer);
};

const createCard = (player) => {
  const playerCard = document.createElement("div");
  const name = document.createElement("p");
  const age = document.createElement("p");
  const gender = document.createElement("p");
  const sportType = document.createElement("p");
  const sport = document.createElement("div");
  const removeBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const btnSection = document.createElement("div");
  const bgDiv = document.createElement("div");
  const textDiv = document.createElement("div");

  //assigning entered values to card sections

  name.textContent = player.name;
  age.textContent = `Age:${player.age}`;
  gender.textContent = `Gender:${player.gender}`;
  sportType.textContent = `Type:${player.sportType}`;
  sport.textContent = `Sport:${player.sport}`;
  removeBtn.textContent = "Delete";
  editBtn.textContent = "Edit";

  editBtn.classList.add("cardBtn");

  removeBtn.classList.add("cardBtn", "removeBtn");
  removeBtn.addEventListener("mouseenter", () => {
    removeBtn.style.color = "red";
  });
  removeBtn.addEventListener("mouseleave", () => {
    removeBtn.style.color = "black";
  });

  playerCard.classList.add("playerCard");
  btnSection.classList.add("cardBtnSection");

  if (player.profileURL) {
    bgDiv.style.backgroundImage = `url("${player.profileURL}")`;
  }

  bgDiv.classList.add("cardBG");
  playerCard.appendChild(bgDiv);
  const leftText = document.createElement("div");
  const rightText = document.createElement("div");

  leftText.appendChild(name);
  leftText.classList.add("leftText");

  rightText.appendChild(age);
  rightText.appendChild(gender);
  rightText.appendChild(sportType);
  rightText.appendChild(sport);
  rightText.classList.add("rightText");

  textDiv.appendChild(leftText);
  textDiv.appendChild(rightText);

  textDiv.classList.add("cardText");
  playerCard.appendChild(textDiv);

  btnSection.appendChild(editBtn);
  btnSection.appendChild(removeBtn);

  playerCard.appendChild(btnSection);

  playerSection.appendChild(playerCard);

  //Remove Btn

  removeBtn.addEventListener("click", (e) => {
    if (confirm("The player card will be deleted. Proceed?")) {
      let removedID = player.id;
      addedPlayers = addedPlayers.filter((player) => player.id !== removedID);
      //updateStorage();
      e.target.parentNode.parentElement.remove();
    }
  });

  //edit

  editBtn.addEventListener("click", (e) => {
    isEdit = true;
    console.log(player);
    editID = player.id;
    nameInput.value = player.name;
    ageInput.value = player.age;
    genderInput.value = player.gender;
    sportTypeInput.value = player.sportType;
    displaySportDropdownHandler();
    sportInput.value = player.sport;
    //profileInput.value = player.profileURL;
    previewImg.hidden = false;
    previewImg.src = player.profileURL;
    newImgLabel.hidden = false;
    profileInput.hidden = true;
    nameInput.classList.remove("errorInput");
    ageInput.classList.remove("errorInput");
    genderInput.classList.remove("errorInput");
    sportTypeInput.classList.remove("errorInput");
    sportInput.classList.remove("errorInput");
    profileInput.classList.remove("errorInput");
    nameError.hidden = true;
    ageError.hidden = true;
    genderError.hidden = true;
    sportTypeError.hidden = true;
    sportError.hidden = true;
    profileError.hidden = true;
    previewImg.hidden = false;
  });
};

function displayCard(playersDisplay) {
  //getStoredPlayers();
  playersDisplay.forEach((player) => {
    createCard(player);
  });
}

const searchField = document.querySelector("#searchField");
const filterField = document.querySelector("#filterField");
const searchTermHandler = (e) => {
  searchTerm = e.target.value;
  toBeDisplayed();
};
const filterHandler = (e) => {
  filterValue = e.target.value;
  toBeDisplayed();
};
searchField.addEventListener("input", searchTermHandler);
filterField.addEventListener("change", filterHandler);

const toBeDisplayed = () => {
  playerSection.innerHTML = "";
  if (!searchField.value && filterField.value == "all") {
    //getStoredPlayers();
    displayCard(addedPlayers);
  } else if (searchField.value && filterField.value == "all") {
    let searched = addedPlayers.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    displayCard(searched);
  } else if (filterField.value != "all" && !searchField.value) {
    let filtered = addedPlayers.filter(
      (player) => player.sportType == filterValue
    );

    displayCard(filtered);
  } else if (searchField.value && filterField.value) {
    let filtered = addedPlayers.filter(
      (player) => player.sportType == filterValue
    );
    let searchedAndFiltered = filtered.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayCard(searchedAndFiltered);
  }
};

//cancel btn

document
  .querySelector("#cancelBtn")
  .addEventListener("click", clearFormHandler);
