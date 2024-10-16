document.addEventListener('DOMContentLoaded', function () {
    const updateButtons = document.querySelectorAll('.button-update');
    const deleteButtons = document.querySelectorAll('.button-delete');

    // Evento para os botões de Atualizar
    updateButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr'); // Pega a linha mais próxima
            const idNota = row.cells[0].innerText; // Pega o ID da nota
            const idAluno = row.cells[1].innerText; // Pega o ID do aluno
            const idProfessor = row.cells[2].innerText; // Pega o ID do professor
            const idDisciplina = row.cells[3].innerText; // Pega o ID da disciplina
            const nota = row.cells[4].innerText; // Pega a nota

            // Aqui você pode abrir um modal ou preencher um formulário com os dados da nota
            console.log(`Atualizar Nota: ${idNota}, Aluno: ${idAluno}, Professor: ${idProfessor}, Disciplina: ${idDisciplina}, Nota: ${nota}`);
            // Exemplo: preencha o formulário com os dados para edição
        });
    });

    // Evento para os botões de Excluir
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr'); // Pega a linha mais próxima
            const idNota = row.cells[0].innerText; // Pega o ID da nota

            // Aqui você pode adicionar a lógica para confirmar e excluir a nota
            if (confirm(`Tem certeza que deseja excluir a nota ID ${idNota}?`)) {
                // Adicione aqui a lógica para excluir a nota (chamada AJAX, por exemplo)
                console.log(`Nota ID ${idNota} excluída.`);
                row.remove(); // Remove a linha da tabela
            }
        });
    });
});
