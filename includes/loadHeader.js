
async function loadHeader(){
    const response = await fetch('/includes/header.html');
    const html = await response.text();
    document.getElementById('header').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', loadHeader)