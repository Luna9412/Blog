document.addEventListener('DOMContentLoaded', ()=> {
    if(!sessionStorage.getItem('userName')){
        window.location.href = 'login.html';
    }else{
        const api = "http:/127.0.0.1:4000/api/publicaciones/"; // CONEXION A LA API
        const leerImagen = "http:/127.0.0.1:4000/api/publicaciones/image/"; // CONEXION AL SERVIVOR PARA LEER LA IMAGEN
        const sesion = JSON.parse(sessionStorage.getItem('userName')); // OBTENER LA SESION DEL USUARIO
        nameUser.innerHTML = sesion.user;
        const buscarPosts = document.querySelector('#buscarPosts');
        const misPosts = document.querySelector('#misPosts');
        const postLista = document.querySelector('.posts-list');
        let post = [];
        fetch(api + "listarPorIdPublicacion/" + sesion.user_id,{
            method: 'GET'
        })
        .then((res)=> res.json())
        .then((res)=> {
            if(res.exito === true){
                displayPosts(res.post);
            }else{
                console.log("no hay posts");
            }
        })
        .catch((error)=>{
            console.log(error);
        });
        function displayPosts(filtrosPosts){
            let indice = 0;
            filtrosPosts.forEach((post)=>{
                const postCard = document.createElement('div');
                const col = document.createElement('div');
                col.setAttribute('class','col-md-9');
                postCard.classList.add("post-card");
                postCard.setAttribute('class','article card mb-4 shadow-sm');
                postCard.innerHTML = `
                <img src="${post.ImagenRuta ? leerImagen + "" + post.ImagenRuta : ""}" class="card-img-top" alt="Imagen del post" id="imagenPost" onerror="this.style.display='block'"/>
                <div class="card-body">
                    <h3 class="card-title">${post.titulo}</h3>
                    <p class="text-muted">${post.fechaPublicacion} por </p>
                    <p id="summary" class="card-text">${post.subTitulo}</p>
                    <p id="full-content" class="hidden-content">${post.contenidoPublicacion}</p>
                    <button class="btn btn-primary" id="read-more-btn">Leer más</button>
                </div>
                <!-- Comentarios -->
                <div class="card-footer">
                    <h5>Comentarios</h5>
                    <button class="btn btn-outline-dark" id="toggle-comments-btn">Mostrar comentarios</button>
                    <div class="comment-list mt-3" id="comment-list" style="display: none">
                        <div class="comment-item">
                        <strong>J.D. Luna:</strong>
                        <p>Los consejos son muy útiles,especialmente para mejorar la velocidad de farmeo.</p>
                    </div>
                    <div class="comment-item">
                        <strong>L.M Jimenez:</strong>
                        <p>Interesante, Definitivamente probaré estas guias.</p>
                    </div>
                </div>
                <div class="comment-input mt-3">
                    <form>
                        <textarea class="form-control" id="commentText" rows="3" placeholder="deja tu comentario aquí..."></textarea>
                        <button type="submit" class="btn btn-success mt-2">Comentar</button>
                    </form>
                </div>
                <div class="post-actions position-absolute rounded-pill top-0 end-0 m-1">
                    <button class="btn btn-light btn-actions rounded-pill edit-button me-1" data-bs-toggle="modal" data-bs-target="#addPostModal" data-id="${post._id}" data-action="edit"><i class="bi bi-pencil-square text-dark" style="font-size: larger"></i></button>
                    <button class="btn btn-danger btn-actions rounded-pill delete-button" id="delete-button"  data-id="${post._id}" data-action="delete"><i class="bi bi-trash3 text-dark" style="font-size: larger"></i></button>
                </div>
            </div>
            `;
            col.appendChild(postCard);
            postLista.appendChild(col);
            });
        }
        displayPosts(post);
    }
});
function previewImage(event){
    const preview = document.querySelector('preview');
    const file = event.target.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            preview.src = e.target.result;
            preview.classList.remove('d-none');
        };
        reader.readAsDataURL(file);
    }
}