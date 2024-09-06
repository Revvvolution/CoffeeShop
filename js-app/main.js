const beanVarietyUrl = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
const container = document.querySelector("#container");

    const printBeanVarieties = (beanVariety) => {
        const composedHTML_Content = `
            <section class="bv_object">Bean Varieties
                <h3>${beanVariety.Name}</h3>
                <ul>
                    <li>Region: ${beanVariety.Region}</li>
                    <li>Notes: ${beanVariety.Notes}</li>
                </ul>
            </section>
            <br>
        `;

        container.innerHTML += composedHTML_Content
    };


button.addEventListener("click", () => {
    const composedHTML_Header = `<h1>Bean Varieties</h1>`;
    container.innerHTML = composedHTML_Header
    getAllBeanVarieties()
        .then(beanVarieties => {
            console.log(beanVarieties);
            printBeanVarieties(beanVarieties);
        })
});

function getAllBeanVarieties() {
    return fetch(beanVarietyUrl).then(resp => resp.json());
}