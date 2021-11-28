// sync cursos with localStorage
!!localStorage.getItem('cursos')
    ? cursos = JSON.parse(localStorage.getItem('cursos'))
    : localStorage.setItem('cursos', JSON.stringify(cursos))

// update localStorage on changes
function updateLocalStorage(value) {
    document.querySelector('.overlay').style.display = 'block'
    document.querySelector('.overlay p').innerHTML = value
    localStorage.setItem('cursos', JSON.stringify(cursos))
    setTimeout(function () {
        window.location.reload();
    }, 2000)
}

function exibirCurso() {
    let notFounded = true
    let id = parseInt(document.getElementById('id_curso').value)
    JSON.parse(localStorage.getItem('cursos')).map((curso) => {
        if (curso.id == id) {
            document.getElementById("id_curso_atualizar").value = curso.id
            document.getElementById("titulo_atualizar").value = curso.titulo
            document.getElementById("descricao_atualizar").value = curso.descricao
            document.getElementById("imagem_atualizar").value = curso.imagem
            document.getElementById("professor_atualizar").value = curso.nomeProfessor
            document.getElementById("aulas_atualizar").value = curso.listaAulas
            notFounded = false
        }
    });

    if (notFounded) {
        document.getElementById("exibir").innerHTML = '<p>ID Não encontrado</p>'
    } else {
        if (document.body.contains(document.querySelector("#exibir p"))) {
            document.querySelector("#exibir p").remove()
        }
    }

}

// change
function alterar(value) {

    let cursoIndex = JSON.parse(localStorage.getItem('cursos')).findIndex((curso => curso.id == parseInt(document.getElementById('id_curso').value)));

    console.log(cursoIndex)

    cursos[cursoIndex].titulo = document.getElementById("titulo_atualizar").value,
        cursos[cursoIndex].descricao = document.getElementById("descricao_atualizar").value
    cursos[cursoIndex].imagem = document.getElementById("imagem_atualizar").value
    cursos[cursoIndex].nomeProfessor = document.getElementById("professor_atualizar").value
    cursos[cursoIndex].listaAulas = document.getElementById("aulas_atualizar").value

    updateLocalStorage(value)

}

// create
function criar(value) {
    let novoCurso = {
        id: parseFloat(document.getElementById("id_curso_criar").value),
        titulo: document.getElementById("titulo_criar").value,
        descricao: document.getElementById("descricao_criar").value,
        imagem: document.getElementById("imagem_criar").value,
        nomeProfessor: document.getElementById("professor_criar").value,
        listaAulas: document.getElementById("aulas_criar").value
    }
    cursos.push(novoCurso)
    updateLocalStorage(value)
}

// listar
function listarCursos() {
    document.getElementById('listar').innerHTML = '';
    JSON.parse(localStorage.getItem('cursos')).map((curso, index) => {
        document.getElementById('listar').innerHTML += `<li>
                                                                                                        <p>ID: ${curso.id}</p>
                                                                                                        <p>Descrição: ${curso.descricao}</p>
                                                                                                        <p>Imagem: <img src="${curso.imagem}"/></p>
                                                                                                        <p>Professor: ${curso.nomeProfessor}</p>
                                                                                                        <p>Título: ${curso.titulo}</p>
                                                                                                        <p>Aulas: <a href="${curso.listaAulas}">${curso.listaAulas}</a></p>
                                                                                                        <button onclick="removerCurso(${parseInt(index)})">Remover</button>
                                                                                                    </li>`
    })
}

function removerCurso(index) {
    cursos.splice(index, 1)
    updateLocalStorage('Curso removido!')
}