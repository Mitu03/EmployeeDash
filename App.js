import { useEffect, useState } from "react";
import details from "../Data/Data.json";

function App() {
  const [post, setpost] = useState([]);
  const [showForm, setShowform] = useState(false);
  const [ShowSingleEmp, setShowSingleEmp] = useState(null);

  function handleShowAddForm() {
    setShowform((show) => !show);
  }

  function handleForm(posts) {
    setpost((post) => [...post, posts]);
  }

  function handleListenBtn(click) {
    setShowSingleEmp(click);
  }

  useEffect(function () {
    setpost(details?.details || []); // Safeguard against undefined
  }, []);

  return (
    <div className="FullBody">
      <header>
        <h1>EmployeeManagement-Dashboard</h1>
        <button onClick={handleShowAddForm}>
          {showForm ? "Close" : "Add Form"}
        </button>
      </header>
      <main>
        <EmployeeList post={post} BtnClick={handleListenBtn} />
        <SingleEmployee singlemp={ShowSingleEmp} />
      </main>

      {showForm && (
        <FormToAdd onAddForm={handleForm} setShowform={setShowform} />
      )}
    </div>
  );
}

function EmployeeList({ post, BtnClick }) {
  return (
    <div className="Emplist">
      <h1 className="Emp-header">Employee</h1>
      <EmployeeListfnln post={post} BtnClick={BtnClick} />
    </div>
  );
}

function EmployeeListfnln({ post, BtnClick }) {
  return (
    <ul className="EmployeeListfnln--">
      {post.map((employee) => (
        <li key={employee.id} className="li-list">
          <button onClick={() => BtnClick(employee)} className="Empbtn">
            {employee.firstName} {employee.lastName}
          </button>
        </li>
      ))}
    </ul>
  );
}

function SingleEmployee({ singlemp }) {
  return (
    <div className="SinEmp">
      <h1 className="Emp-header">Single Employee</h1>
      {singlemp ? (
        <div className="SingleEmployee">
          <img src="" alt="name" />
          <h2>
            {singlemp.firstName} {singlemp.lastName}
          </h2>
          <ul>
            <li className="li-list">
              <strong>Email:</strong> {singlemp.email}
            </li>
            <li className="li-list">
              <strong>Contact:</strong> {singlemp.contactNumber}
            </li>
            <li className="li-list">
              <strong>Dob:</strong> {singlemp.dob}
            </li>
            <li className="li-list">
              <strong>Address:</strong> {singlemp.address}
            </li>
          </ul>
        </div>
      ) : (
        <p>No employee selected</p>
      )}
    </div>
  );
}

function FormToAdd({ onAddForm, setShowform }) {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [dob, setdob] = useState("");
  const [address, setaddress] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!fname || !lname || !email || !contact || !dob || !address) return;
    onAddForm({
      id: Date.now(),
      firstName: fname,
      lastName: lname,
      email,
      contactNumber: contact,
      dob,
      address,
    });
    setfname("");
    setlname("");
    setemail("");
    setcontact("");
    setdob("");
    setaddress("");
    setShowform(false);
  }

  return (
    <div className="Form-div">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          required
          value={fname}
          onChange={(e) => setfname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={lname}
          onChange={(e) => setlname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact"
          required
          value={contact}
          onChange={(e) => setcontact(e.target.value)}
        />
        <input
          type="date"
          placeholder="DOB"
          required
          value={dob}
          onChange={(e) => setdob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setaddress(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
