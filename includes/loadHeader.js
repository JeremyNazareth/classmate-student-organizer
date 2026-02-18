
async function loadHeader(){
    try{
        const response = await fetch('/includes/header.html');
        const html = await response.text();
        document.getElementById('header').innerHTML = html;
    } catch (error){
        const headerHTML = `
        <header class="header"> 
            <nav>
                <a class="header-logo" href="index.html" text-decoration: none;><p style="line-height: 2; margin-right: 4px;">📚</p><p style="line-height: 2;">ClassMate</p></a>
                <ul>
                    <li><a href="index.html"> Inicio </a></li>
                    <li><a href="blocks.html"> Bloques </a></li>
                    <li><a href="about.html">Acerca de</a></li>
                </ul>
            </nav>
        </header>
        `
        document.getElementById('header').innerHTML = headerHTML;
    }
    
}

document.addEventListener('DOMContentLoaded', loadHeader)