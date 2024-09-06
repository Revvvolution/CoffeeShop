const beanVarietyUrl = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
const container = document.querySelector("#container");
const formButton = document.querySelector("#newBV-button")


        // Button click event for 'Run It!' button that will display a list of all bean variety objects
button.addEventListener("click", () => {

    let composedHTML_Content = `<h1>Bean Varieties</h1>`

    getAllBeanVarieties()
    .then(beanVarieties => {
        console.log(beanVarieties);

        const bvObjects = beanVarieties.map((bv) => {
            return(`
                <section class="bv_object">
                    <h3>${bv.name}</h3>
                    <ul>
                        <li><strong>Region: </strong> ${bv.region}</li>
                        <li><strong>Notes: </strong> ${bv.notes === null ? "none" : bv.notes}</li>
                    </ul>
                </section>
                <br>
            `);
        })
        composedHTML_Content += bvObjects.join("");
        container.innerHTML = composedHTML_Content
    })
});


            // Button click event for 'Create New Bean Variety' button that will display a form to add a new bean variety object to the database
formButton.addEventListener("click", () => {

    let formHTML_NewBV = `
        <h1>New Bean Variety</h1>
        <form id="addBVForm">
            <label for="name">Name: </label>
            <input type="text" id="name" name="name" required>
            <br>
            <br>
            <label for="region">Region: </label>
            <input type="text" id="region" region="region" required>
            <br>
            <br>
            <label for="notes">Notes: </label>
            <input type="text" id="notes" notes="notes">
            <br>
            <br>
            <button type="submit">Add Bean Variety</button>
        </form>
    `
    container.innerHTML = formHTML_NewBV
    
    
            // POST request sent after 'Add Bean Variety' button (submit) is selected
    document.getElementById('addBVForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
            // assigning form's input values to variables
    const name = document.getElementById('name').value;
    const region = document.getElementById('region').value;
    const notes = document.getElementById('notes').value;
    
    const newBVObj = {
    name: name,
    region: region,
    notes: notes
    };
    

            // made an alert and a catch for the POST operation so user can visibly see if the submission succeeded (before it looked like nothing happened)
    fetch(beanVarietyUrl, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBVObj)
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    alert('Bean variety added successfully');
    })
    .catch((error) => {
    console.error('Error:', error);
    alert('Failed to add bean variety');
    })
    });

});




function getAllBeanVarieties() {
    return fetch(beanVarietyUrl).then(resp => resp.json());
}