const beanVarietyUrl = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
const container = document.querySelector("#container");



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


function getAllBeanVarieties() {
    return fetch(beanVarietyUrl).then(resp => resp.json());
}