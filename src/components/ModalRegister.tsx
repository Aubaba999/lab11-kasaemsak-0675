import { useState } from "react";

export default function ModalRegister() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");

  // State variables for extra items
  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);

  // State for terms & conditions
  const [agree, setAgree] = useState(false);

  // State variables for validation errors
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [planError, setPlanError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  // --- Event Handlers ---
  const inputFnameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFnameError(false);
    setFname(event.target.value);
  };

  const inputLnameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLnameError(false);
    setLname(event.target.value);
  };

  const selectPlanOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlanError(false);
    setPlan(event.target.value);
  };

  const radioGenderOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenderError(false);
    setGender(event.target.value);
  };

  const cbBuyBottleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyBottle(event.target.checked);
  };

  const cbBuyShoesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyShoes(event.target.checked);
  };

  const cbBuyCapOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyCap(event.target.checked);
  };

  // --- Logic Functions ---
  const computeTotalPayment = () => {
    let total = 0;
    if (plan === "funrun") total += 500;
    if (plan === "mini") total += 800;
    if (plan === "half") total += 1200;
    if (plan === "full") total += 1500;

    // Extra items
    let extra = 0;
    if (buyBottle) extra += 200;
    if (buyShoes) extra += 600;
    if (buyCap) extra += 400;

    // Check discount: buy all 3 items
    if (buyBottle && buyShoes && buyCap) {
      extra = extra * 0.8; // apply 20% discount
    }

    total += extra;
    return total;
  };

  const registerBtnOnClick = () => {
    const isFnameValid = fname.trim() !== "";
    const isLnameValid = lname.trim() !== "";
    const isPlanValid = plan !== "";
    const isGenderValid = gender !== "";

    setFnameError(!isFnameValid);
    setLnameError(!isLnameValid);
    setPlanError(!isPlanValid);
    setGenderError(!isGenderValid);

    if (isFnameValid && isLnameValid && isPlanValid && isGenderValid) {
      alert(
        `Registration complete. Please pay money for ${computeTotalPayment().toLocaleString()} THB.`
      );
    }
  };

  return (
    <div
      className="modal fade"
      id="modalregister"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* First name & Last name */}
            <div className="d-flex gap-2">
              <div className="flex-grow-1">
                <label className="form-label">First name</label>
                <input
                  className={"form-control" + (fnameError ? " is-invalid" : "")}
                  onChange={inputFnameOnChange}
                  value={fname}
                />
                <div className="invalid-feedback">Invalid first name.</div>
              </div>
              <div className="flex-grow-1">
                <label className="form-label">Last name</label>
                <input
                  className={"form-control" + (lnameError ? " is-invalid" : "")}
                  onChange={inputLnameOnChange}
                  value={lname}
                />
                <div className="invalid-feedback">Invalid last name.</div>
              </div>
            </div>

            {/* Running Plan */}
            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={"form-select" + (planError ? " is-invalid" : "")}
                onChange={selectPlanOnChange}
                value={plan}
              >
                <option value="">Please select..</option>
                <option value="funrun">Fun run 5.5 Km (500 THB)</option>
                <option value="mini">Mini Marathon 10 Km (800 THB)</option>
                <option value="half">Half Marathon 21 Km (1,200 THB)</option>
                <option value="full">
                  Full Marathon 42.195 Km (1,500 THB)
                </option>
              </select>
              <div className="invalid-feedback">Please select a Plan.</div>
            </div>

            {/* Gender */}
            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={radioGenderOnChange}
                  checked={gender === "male"}
                />
                Male 👨
                <input
                  className="mx-2 form-check-input"
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={radioGenderOnChange}
                  checked={gender === "female"}
                />
                Female 👩
                {genderError && (
                  <div className="text-danger mt-1 small">
                    Please select gender.
                  </div>
                )}
              </div>
            </div>

            {/* Extra Items */}
            <div className="mt-2">
              <label className="form-label">Extra Item(s)</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyBottleOnChange}
                  checked={buyBottle}
                />
                <label className="form-check-label">Bottle 🍼 (200 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyShoesOnChange}
                  checked={buyShoes}
                />
                <label className="form-check-label">Shoes 👟 (600 THB)</label>
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyCapOnChange}
                  checked={buyCap}
                />
                <label className="form-check-label">Cap 🧢 (400 THB)</label>
              </div>
                {/* แสดงข้อความส่วนลดถ้าเลือกครบทั้ง 3 */}
                {buyBottle && buyShoes && buyCap && (
                <p style={{ color: "green", marginTop: "5px" }}>
                  (20% Discounted)
                    </p>
                  )}
                </div>

            <div className="alert alert-primary mt-3" role="alert"> Promotion📢 Buy all items to get 20% Discount </div>

            {/* Total Payment */}
            <div>
              Total Payment : {computeTotalPayment().toLocaleString()} THB
            </div>
          </div>
          <div className="modal-footer">
            <div>
              <input
                className="me-2 form-check-input"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              I agree to the terms and conditions
            </div>
            <button
              className="btn btn-success my-2"
              onClick={registerBtnOnClick}
              disabled={!agree}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
