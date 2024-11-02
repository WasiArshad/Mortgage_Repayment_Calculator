// Button DOM
const mortgageForm = document.getElementById("mortgageForm");
const flexInput = document.querySelector(".flex-input");

// Input Fields empty DOM
const loanAmounT = document.getElementById("amount");
const loanTerM = document.getElementById("term");
const loanInteresT = document.getElementById("interest");

// Right AND Left Card DOM
const rightCard = document.querySelector(".right-card");
const leftCard = document.querySelector(".left-card");

// Amount Error DOM
const amountError = document.getElementById("amount-error");
const inputWrapper = document.querySelector(".input-wrapper");
const currencyWrapper = document.querySelector(".currency-wrapper");
const currencySymbol = document.querySelector(".currency-symbol");

// Year Error DOM
const yearError = document.getElementById("year-error");
const InputWrapper = document.querySelector(".input_wrapper");
const suffixWrapper = document.querySelector(".suffix-wrapper");
const suffix = document.querySelector(".suffix");

// Interest Error DOM
const percentError = document.getElementById("percent-error");
const percentageWrapper = document.querySelector(".percentage_wrapper");
const percentWrapper = document.querySelector(".percent-wrapper");
const suffix_p = document.querySelector(".suffix_p");

// Calculation Error DOM
const calculationError = document.getElementById("calculation-error");

// Radio Inputs fields
const inputField = document.querySelector('input[name="input1"]');
const InputFielD = document.querySelector('input[name="input2"]');

// Hidden Section DOM
const rightWrapper = document.querySelector(".right-wrapper");
const completeSection = document.querySelector(".complete-section");
const completeAmtInt = document.getElementById("complete-amt");
const completeAmtTot = document.getElementById("complete-amt-1");

function calculateMortgage() {
  const loanAmount = loanAmounT.value.trim();
  const loanTerm = loanTerM.value.trim();
  const loanInterest = loanInteresT.value.trim();

  let hasErrors = false;

  if (loanAmount == "") {
    amountError.innerHTML = "This field is required";
    inputWrapper.classList.add("error-amt2");
    currencyWrapper.classList.add("error-amt");
    currencySymbol.classList.add("error-amt1");
    hasErrors = true;
    loanAmounT.style.border = "none";
  } else {
    clearAmountError();
  }
  if (loanTerm == "") {
    yearError.innerHTML = "This field is required";
    InputWrapper.classList.add("error-suf");
    suffixWrapper.classList.add("error-suf1");
    suffix.classList.add("error-suf2");
    hasErrors = true;
    loanTerM.style.border = "none";
  } else {
    clearTermError();
  }
  if (loanInterest == "") {
    percentError.innerHTML = "This field is required";
    percentageWrapper.classList.add("error-sufP");
    percentWrapper.classList.add("error-sufP1");
    suffix_p.classList.add("error-sufP2");
    hasErrors = true;
    loanInteresT.style.border = "none";
  } else {
    clearInterestError();
  }
  // Validate Radio Options
  const repaymentOptionElement = document.getElementById("repaymentOption");
  const interestOnlyOptionElement =
    document.getElementById("interestOnlyOption");

  const repaymentChecked = repaymentOptionElement.checked;
  const interestChecked = interestOnlyOptionElement.checked;

  if (!repaymentChecked && !interestChecked) {
    calculationError.innerHTML = "This field is required";
    hasErrors = true;
  } else {
    calculationError.innerHTML = "";
  }
  if (hasErrors) {
    if (window.innerWidth < 768) {
      leftCard.style.height = "660px";
      rightCard.style.height = "385px";
      rightCard.style.marginTop = "95px";
    } else {
      leftCard.style.height = "660px";
      rightCard.style.height = "660px";
    }
  } else {
    leftCard.style.height = "605px";
    rightCard.style.height = "605px";
  }
  if (hasErrors) return;

  if (repaymentChecked) {
    const monthlyPayment = calculateRepayment(
      loanAmount,
      loanTerm,
      loanInterest
    );
    const termInMonths = parseInt(loanTerm) * 12;
    const totalPayment = monthlyPayment * termInMonths;

    completeAmtInt.innerHTML = `£${monthlyPayment
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    completeAmtTot.innerHTML = `£${totalPayment
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    document.querySelector(".when_interest").innerHTML =
      "Your monthly repayments";
    applySelectedStyles(repaymentOptionElement, interestOnlyOptionElement);
    inputField.style.backgroundColor = "hsla(61, 70%, 52%, 0.206)";
    inputField.style.border = "1.5px solid hsl(61, 70%, 52%)";
  } else if (interestChecked) {
    const onlyInterest = calculateInterestOnly(loanAmount, loanInterest);
    const monthlyPayment = calculateRepayment(
      loanAmount,
      loanTerm,
      loanInterest
    );
    const totalPayment = monthlyPayment * (parseInt(loanTerm) * 12);

    completeAmtInt.innerHTML = `£${onlyInterest
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    completeAmtTot.innerHTML = `£${totalPayment
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    document.querySelector(".when_interest").innerHTML =
      "Your monthly interests";
    applySelectedStyles(interestOnlyOptionElement, repaymentOptionElement);
    InputFielD.style.backgroundColor = "hsla(61, 70%, 52%, 0.206)";
    InputFielD.style.border = "1.5px solid hsl(61, 70%, 52%)";
  }
  rightWrapper.classList.add("hide");
  completeSection.classList.remove("hide");

  adjustHeight();
  loanAmounT.value = formatAmount(loanAmount);
  mortgageForm.removeEventListener("click", calculateMortgage);
}
mortgageForm.addEventListener("click", calculateMortgage);

function calculateRepayment(loanAmount, loanTerm, loanInterest) {
  const loan = parseFloat(loanAmount);
  const rate = parseFloat(loanInterest) / 100 / 12;
  const term = parseInt(loanTerm) * 12;

  return (
    (loan * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
  );
}

function calculateInterestOnly(loanAmount, loanInterest) {
  let loan = parseFloat(loanAmount);
  let rate = parseFloat(loanInterest) / 100 / 12;

  return loan * rate;
}
function clearAmountError() {
  amountError.innerHTML = "";
  inputWrapper.classList.remove("error-amt2");
  currencyWrapper.classList.remove("error-amt");
  currencySymbol.classList.remove("error-amt1");
  loanAmounT.style.border = "1px solid hsl(200, 24%, 40%)";
}
function clearTermError() {
  yearError.innerHTML = "";
  InputWrapper.classList.remove("error-suf");
  suffixWrapper.classList.remove("error-suf1");
  suffix.classList.remove("error-suf2");
  loanTerM.style.border = "1px solid hsl(200, 24%, 40%)";
}
function clearInterestError() {
  percentError.innerHTML = "";
  percentageWrapper.classList.remove("error-sufP");
  percentWrapper.classList.remove("error-sufP1");
  suffix_p.classList.remove("error-sufP2");
  loanInteresT.style.border = "1px solid hsl(200, 24%, 40%)";
}
function applySelectedStyles(selectedOption, unselectedOption) {
  selectedOption.classList.add("submitted");
  unselectedOption.classList.remove("submitted");
}
function adjustHeight() {
  if (window.innerWidth < 768) {
    rightCard.style.height = "385px";
    rightCard.style.marginTop = "95px";
  } else {
    rightCard.style.height = "605px";
    rightCard.style.marginTop = "0px";
  }
}
function formatAmount(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatTerm(value) {
  const formattedValue = value.replace(/[^0-9]/g, "").slice(0, 2);
  return formattedValue;
}
function formatInterest(value) {
  const numericValue = value.replace(/[^0-9.]/g, "");
  const formattedValue = numericValue
    .replace(/(\..*?)\..*/g, "$1")
    .replace(/^(\d{1,3})(\.\d{0,2})?.*$/, "$1$2");
  return formattedValue;
}
loanAmounT.addEventListener("input", function () {
  applyInputStyles(this);
});
loanTerM.addEventListener("input", function () {
  this.value = formatTerm(this.value);
  suffixWrapper.style.left = "64%";
  percentWrapper.style.left = "75.5%";
  if (window.innerWidth < 768) {
    suffixWrapper.style.left = "77.1%";
    percentWrapper.style.left = "84.5%";
    flexInput.style.gap = "";
  }
  applyInputStyles(this);
});

loanInteresT.addEventListener("input", function () {
  this.value = formatInterest(this.value);
  percentWrapper.style.left = "75.1%";
  suffixWrapper.style.left = "63.7%";
  if (window.innerWidth < 768) {
    percentWrapper.style.left = "84.5%";
    suffixWrapper.style.left = "77.1%";
  }
  applyInputStyles(this);
});
function applyInputStyles(input) {
  input.style.fontWeight = "700";
  input.style.fontFamily = "Plus Jakarta Sans, sans-serif";
}
document.getElementById("clear").addEventListener("click", function () {
  clearAll();
  mortgageForm.addEventListener("click", calculateMortgage);
});

function clearAll() {
  loanAmounT.value = "";
  loanTerM.value = "";
  loanInteresT.value = "";
  document.querySelector('input[name="input1"]').style = "";
  document.querySelector('input[name="input2"]').style = "";
  document.getElementById("repaymentOption").classList.remove("submitted");
  document.getElementById("interestOnlyOption").classList.remove("submitted");
  clearAmountError();
  clearTermError();
  clearInterestError();
}
window.addEventListener("resize", adjustHeight);
function submitForm() {}
