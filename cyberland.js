const $ = (x) => document.querySelector(x)
const $$ = (x) => document.querySelectorAll(x)

let backend = localStorage.getItem('backend')
let view = 'board'

const getPostCounts = (domain = backend) => {
    return fetch(`https://${domain}/status`,
        { mode: 'no-cors' }
    ).then(res => {
        console.log(res)
        // res.json()
    })
}

/*** Backend selection */
{
    const submitBackend = async (event) => {
        event.preventDefault()
        const form = event.target
        const domain = form.elements.namedItem("domain").value.trim()
        // verify if the domain even exists
        try {
            await getPostCounts(domain)
            backend = domain
            view = 'board'
            refreshView()
        } catch (err) {
            const errorContainer = $('#input-backend-errors')
            console.error(err, err.message)
            errorContainer.textContent = `Error: ${err.message}`
        }
    }

    backendSection = $('#input-backend')
    backendSection.onsubmit = submitBackend
}

function refreshView() {
    // force the view to be the backend if there is no board
    if (backend === null) {
        view = 'backend'
    }
    const VIEW_SUFFIX = '-view'
    const currentViewName = `${view}${VIEW_SUFFIX}`

    Array.from($$('.view')).map(view => {
        view.style.display = (currentViewName === view.id) ? 'block' : 'none'
    })
}

refreshView()