window.addEventListener('DOMContentLoaded', () => localStorage.clear());

function focusSubmit() {
  if (document.querySelector(".notes-modal").style.display !== "block") {
    setTimeout(() => { document.querySelector(".submit").focus() }, 10);
  }
}

function auth() {
  const user = document.querySelector(".creds");
  const submit = document.querySelector(".submit");
  const pwd = document.querySelector(".pwd").value;
  if (pwd.length > 3) {
    document.querySelector(".user").innerHTML = user.value;
    submit.value = "";
    submit.focus();
    document.querySelector(".modal").style.display = "none";
    localStorage.setItem("qrEnabled", true);
  }
}

function display(qr) {
  if (event.key === 'Enter') {
    const qrValue = qr.value;
    const params = ["id", "cid"];
    const [id, cid] = params.map(param => new URLSearchParams(qrValue).get(param))
    const geolocation = document.querySelector(".user").innerHTML;;
    const timestamp = Date.now();
    if (!id || !cid) {
      document.querySelector(".check").src = "https://i.ibb.co/Mf9RRXZ/fail.png"
      document.querySelector(".content").innerHTML = `<b>Order ID : </b>Invalid [${id}]<br>
                                                      <b>Customer Reference : </b>Invalid [${cid}]`;
      document.querySelector(".submit-btn").style.display = "none";
      document.querySelector(".seals").style.display = "none";
      document.querySelector(".notes").style.display = "none";
    } else {
      localStorage.setItem("qrEnabled", false);
      localStorage.setItem("state", window.location.search === "?out" ? "Outbound" : "Inbound");
      localStorage.setItem("geolocation", `${geolocation}`);
      localStorage.setItem("timestamp", `${timestamp}`);
      localStorage.setItem("id", `${id}`);
      localStorage.setItem("cid", `${cid}`);
      document.querySelector(".check").src = "https://i.ibb.co/zmzyD3h/check.png"
      document.querySelector(".content").innerHTML = `<b>Geolocation : </b>${geolocation}<br>
                                                        <b>Timestamp : </b>${timestamp}<br>
                                                        <b>Order ID : </b>${id}<br>
                                                        <b>License Plate: </b>FK823ND<br>
                                                        <b>Customer ID : </b>${cid}<br>`;
      document.querySelector(".seals").innerHTML = "<small>➕ Scan a <b>Seal</b> to add it</small>"
      document.querySelector(".seals").style.display = "block";
      document.querySelector(".notes").style.display = "none";
      document.querySelector(".submit-btn").style.display = "block";
    }
    document.querySelector(".submit").value = "";
    document.querySelector(".scan-content").style.display = "block";
  }
}

function addSeal(seal) {
  if (event.key === 'Enter' && seal.value.length > 0) {
    const seals = localStorage.getItem("seals");
    const state = localStorage.getItem("state");
    localStorage.setItem("seals", seals ? `${seals},${seal.value}` : seal.value);
    document.querySelector(".seals").innerHTML = `<b>Seals : </b>${localStorage.getItem("seals")}`;
    document.querySelector(".submit").value = "";
  }
}

function submit() {
  const state = localStorage.getItem("state");
  const geolocation = localStorage.getItem("geolocation");
  const timestamp = localStorage.getItem("timestamp");
  const id = localStorage.getItem("id");
  const cid = localStorage.getItem("cid");
  const seals = localStorage.getItem("seals");
  const inSeals = state === "Inbound" ? seals : ""
  const outSeals = state === "Outbound" ? seals : ""
  const notes = localStorage.getItem("notes");
  document.querySelector(".form").src = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSd7gaN0WgZiafn2KFwpybWe2sVmoJASixFJocsOxnjmEhzcUA/formResponse?entry.595035757=${state}&entry.305623421=${geolocation}&entry.735849849=${timestamp}&entry.442296377=${id}&entry.1547747460=${cid}&entry.144388608=${inSeals}&entry.1257195146=${outSeals}&entry.685932902=${notes}`
  localStorage.clear();
  localStorage.setItem("qrEnabled", true);
  document.querySelector(".scan-content").style.display = "none";
}

function openNotes() {
  document.querySelector(".notes-modal").style.display = "block";
  document.querySelector(".notes-input").focus()
}

function addNotes() {
  document.querySelector(".notes-modal").style.display = "none";
  document.querySelector(".notes").style.display = "block";
  document.querySelector(".submit").focus();
  const notes = document.querySelector(".notes-input").value;
  document.querySelector(".notes-input").value = "";
  localStorage.setItem("notes", notes);
  document.querySelector(".notes").innerHTML = `<b>Notes : </b>${notes}`;
}

function closeNotes() {
  document.querySelector(".notes-modal").style.display = "none";
  document.querySelector(".submit").focus();
  document.querySelector(".notes-input").value = "";
}

function cancel() {
  localStorage.clear();
  localStorage.setItem("qrEnabled", true);
  document.querySelector(".scan-content").style.display = "none";
  document.querySelector(".submit").focus();
}
