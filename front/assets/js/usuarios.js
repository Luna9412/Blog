const api = "http://127.0.0.1:4000/api/publicaciones/";
const sesion = JSON.parse(sessionStorage.getItem("userName"));
let nameUser = document.querySelector("#nameUser");
let btnCerrarSesion = document.querySelector("#btnCerrarSesion");
let autorID = sesion.user_id;
let titulo = document.querySelector("#postTitle");
let subTitulo = document.querySelector("#postSubTitle");
let categories = document.querySelector("#categories");
let image = document.querySelector("#postImage");
let contenido = document.querySelector("#postContent");
let idPost = 0;
// CERRAR SESION
btnCerrarSesion.addEventListener("click", (e) => {
  if (!localStorage.getItem("userName")) {
    sessionStorage.clear();
    window.location.href = "login.html";
    history.replaceState(null, null, window.location.href);
  }
});
// ELIMINAT
document.addEventListener("click", (e) => {
  try {
    let action = e.target.closest("button").getAttribute("data-action");
    let id = e.target.closest("button").getAttribute("data-id");
    switch (action) {
      case "delete":
        Swal.fire({
          title: "¿Estás seguro de esta accion?",
          text: "La Publicacion se eliminara permanentemente. ",
          icon: "warning",
          showDenyButton: true,
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(api + "borrarPorId/" + id, {
              method: "DELETE"
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.estado === true) {
                  Swal.fire({
                    title: "Se Elimino el post correctamente.",
                    icon: "success"
                  });
                  window.location.reload();
                } else {
                  Swal.fire({
                    title: "No se pudo eliminar el post!",
                    icon: "error",
                    text: error
                  });
                }
              })
              .catch((error) => {
                Swal.fire({
                  title: "El servidor no responde!",
                  icon: "error",
                  text: error
                });
              });
          }
        });
        break;
// EDITAR
      case "edit":
        idPost = e.target.closest("button").getAttribute("data-id");
        fetch(api + "listarPublicId/" + idPost, {
          method: "GET"
        })
          .then((res) => res.json())
          .then((res) => {
            titulo.value = res.post.titulo;
            sub_titulo.value = res.post.sub_titulo;
            categories.value = res.post.categoria;
            contenido.value = res.post.contenido_publicacion;
          })
          .catch((error) => {
            Swal.fire({
              title: "El servidor no responde!",
              icon: "error",
              text: error
            });
          });
        break;
      default:
        Swal.fire({
          title: "!Accion no valida!",
          icon: "error",
          text: error
        });
        break;
    }
  } catch (error) {}
});

// FORMULARIO DEL POST
document.getElementById("frmPost").addEventListener("submit", (e) => {
  e.preventDefault();
  let action = document.querySelector("#btnGuardar").getAttribute("data-action");
  const frmPost = new FormData(); 
  const fecha = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const fechaPublicacion = fecha.toLocaleDateString(undefined, options);
  switch (action) {
    case "public-post":
      frmPost.append("autorID", sesion.user_id);
      frmPost.append("titulo", document.querySelector("#postTitle").value);
      frmPost.append("subTitulo", document.querySelector("#postSubTitle").value);
      frmPost.append("imagenRuta", document.querySelector("#postImage").files[0]);
      frmPost.append("categoria", document.querySelector("#categories").value);
      frmPost.append("contenidoPublicacion", document.querySelector("#postContent").value);
      frmPost.append("fechaPublicacion", fechaPublicacion);
      fetch(api + "nuevaPublicacion/", {
        method: "POST",
        body: frmPost
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.estado === true) {
            Swal.fire({
              position: "top",
              title: "Se publico el post!",
              icon: "success",
              text: res.mensaje,
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: res.mensaje
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "El servidor no responde!",
            icon: "error",
            text: error
          });
        });
      break;
    case "save-changes-post":
      frmPost.append("titulo", document.querySelector("#postTitle").value);
      frmPost.append("subTitulo", document.querySelector("#postSubTitle").value);
      frmPost.append("imagenRuta", document.querySelector("#postImage").files[0]); // Asegúrate de que image es un input de tipo "file"
      frmPost.append("categoria", document.querySelector("#categories").value);
      frmPost.append("contenidoPublicacion", document.querySelector("#postContent").value);
      fetch(api + "actualizarPorID/" + idPost, {
        method: "PUT",
        body: frmPost
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.estado === true) {
            Swal.fire({
              position: "top",
              title: "Se Modifico el post!",
              icon: "success",
              text: res.mensaje,
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: res.mensaje
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "El servidor no responde!",
            icon: "error",
            text: error
          });
        });
      break;
    default:
      Swal.fire({
        title: "Accion no valida",
        icon: "error",
        text: error
      });
      break;
  }
  document.getElementById("frmPost").reset();
  bootstrap.Modal.getInstance(document.getElementById("addPostModal")).hide();
});