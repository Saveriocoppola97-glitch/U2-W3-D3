//carico l'api tramite url
const library = "https://striveschool-api.herokuapp.com/books";

//recupero l'API mettendola dentro una costante e dando la funzione fetch("nome const")
const getLibrary = function () {
  fetch(library)
    // facciamo un if che se risulta true la "response.ok" ci ritorna la risposta in formato "JSON"
    // invece se false usando -> "throw new Error(response.status)"" richiama il catch
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    // nel caso l' IF sia true creiamo la funzione di ciò che deve succedere nella pagina e cosa deve caricare dal API, nome funzione ".then (data)" :nome standard
    .then((data) => {
      const header = document.getElementById("header");
      header.innerHTML = "<h1>Library</h1>";
      header.classList.add("text-center", "p-3");
      // prendo la row che ci servirà per attaccarci il child "col" successivamente creato
      const row = document.querySelector(".libraryRow");
      // cicliamo con un for tutti i dati (book)
      for (let i = 0; i < data.length; i++) {
        const book = data[i];
        // creiamo un div per la card e aggiungiamo delle classi per le col
        const col = document.createElement("div");
        // aggiungiamo delle classi per rendere la col vera e propria
        col.classList.add("col-12", "col-md-6", "col-lg-3");
        // creiamo la card vera e propria manipolando l' innertext della col
        col.innerHTML = `
      <div class="card h-100">
        <img class="card-img-top img-fluid" style="height:400px; object-fit:cover;" src="${book.img}" alt="libro" />
       <div class="card-body d-flex flex-column">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-value">${book.price} €</p>
        <a href="#" class="btn btn-primary mt-auto">Delete</a>
       </div>
      </div>
      `;
        // prendiamo il bottone
        const btn = col.querySelector(".btn");
        // aggiungiamo un eventlistener che previene il comportamento di default e rimuove l col creata in precedenza richiamando la const "col" che elimina tutto il contenitore div
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          col.remove();
        });
        // appendimo la col alla row
        row.appendChild(col);
      }
    })
    .catch((err) => {
      const error = document.getElementById("header");
      error.innerHTML = "<h1>404 Not Found (Pagina non trovata)</h1>";
    });
};
// richiamo la funzione IMPORTANTE!!
getLibrary();
