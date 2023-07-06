"use strict";

const notes = document.querySelector(".notes");

const addNoteTitle = document.querySelector(".add_note_title");
const addNoteText = document.querySelector(".add_note_text");
const addNoteBtn = document.querySelector(".add_note_btn");
const deleteAllNote = document.querySelector(".delete_all_note_btn");

let localStorageSize = localStorage.length / 2;
let numClick = 1;
let i = 0;
let article;
let inputTitle;
let textArea;
let buttons;
let deleteNote;
let saveNote;
let keyTitle = 0;
let keyText = 1000000;

// Função para adicionar uma nova nota
function adicionarNota() {
  article = document.createElement("ARTICLE");
  inputTitle = document.createElement("INPUT");
  textArea = document.createElement("TEXTAREA");
  buttons = document.createElement("DIV");
  deleteNote = document.createElement("IMG");
  saveNote = document.createElement("IMG");

  article.appendChild(inputTitle);
  article.appendChild(textArea);
  article.appendChild(buttons);
  buttons.appendChild(deleteNote);
  buttons.appendChild(saveNote);
  notes.appendChild(article); 

  article.classList.add("your_note");
  article.classList.add(`your_note_${i}`);
  inputTitle.classList.add(`your_note_title_${i}`);
  textArea.classList.add(`your_note_text_${i}`);
  buttons.classList.add("button_action");
  deleteNote.classList.add(`${keyTitle}`);
  deleteNote.classList.add(`${keyText}`);
  deleteNote.classList.add(`your_note_btn_${i}`);
  saveNote.classList.add(`${keyTitle}`);
  saveNote.classList.add(`${keyText}`);
  saveNote.classList.add(`your_note_btn_${i}`);
}

// Função para atribuir valores aos campos da nota
function atribuirValor() {
  const yourNoteTitle = document.querySelector(`.your_note_title_${i}`);
  const yourNoteText = document.querySelector(`.your_note_text_${i}`);

  deleteNote.src = "https://img.icons8.com/color/48/000000/delete-forever.png";
  saveNote.src = "https://img.icons8.com/color/48/000000/save--v1.png";

  yourNoteTitle.value = addNoteTitle.value;
  yourNoteText.value = addNoteText.value;

  localStorage.setItem(keyTitle, yourNoteTitle.value);
  localStorage.setItem(keyText, yourNoteText.value);

  addNoteTitle.value = "";
  addNoteText.value = "";
}

// Função para recuperar os valores do localStorage e preencher as notas existentes
function recuperarValor() {
  const yourNoteTitle = document.querySelector(`.your_note_title_${i}`);
  const yourNoteText = document.querySelector(`.your_note_text_${i}`);

  deleteNote.src = "https://img.icons8.com/color/48/000000/delete-forever.png";
  saveNote.src = "https://img.icons8.com/color/48/000000/save--v1.png";

  yourNoteTitle.value = localStorage.getItem(keyTitle);
  yourNoteText.value = localStorage.getItem(keyText);
}

// Função para excluir uma nota
function eliminarNota() {
  deleteNote.addEventListener("click", (e) => {
    let resposta = confirm("Tem certeza de que deseja excluir esta nota?");
    if (resposta) {
      notes.removeChild(e.target.parentNode.parentNode);
      localStorage.removeItem(e.target.classList[0]);
      localStorage.removeItem(e.target.classList[1]);
      localStorageSize = localStorage.length / 2;
    }
  });
}

// Função para salvar uma nota
function guardarNota() {
  saveNote.addEventListener("click", (e) => {
    let valorAnteriorTitle = localStorage.getItem(e.path[0].classList[0]);
    let valorAnteriorText = localStorage.getItem(e.path[0].classList[1]);

    let valorAtualTitle = e.path[2].children[0].value;
    let valorAtualText = e.path[2].children[1].value;

    if(valorAnteriorTitle != valorAtualTitle || valorAnteriorText != valorAtualText){
        if(valorAtualTitle.length != 0 && valorAtualText.length != 0){
            let resposta = confirm("Tem certeza de deseja guardar?");
            if(resposta){
                localStorage.setItem(e.path[0].classList[0], valorAtualTitle);
                localStorage.setItem(e.path[0].classList[1], valorAtualText);
            }
        }else{
            alert("Não pode deixar nenhum campo vazio");
        }
    }
  })
}

// Adiciona um evento de clique ao botão "Adicionar Nota"
addNoteBtn.addEventListener("click", () => {
  if( addNoteTitle.value.length != 0 && addNoteText.value.length != 0){
      adicionarNota();
      atribuirValor();
      i++;
      numClick++;
      keyTitle++;
      keyText++;
      localStorageSize = localStorage.length / 2;
      eliminarNota();
      guardarNota();
  }
});

// Adiciona um evento de carregamento à janela
window.addEventListener("load", () => {
  if(localStorage.length > 0){
      while(localStorageSize > i){
          if( localStorage.getItem(keyTitle) == null && 
              localStorage.getItem(keyText) == null ){
              keyTitle++;
              keyText++
          }else{
              adicionarNota();
              recuperarValor();
              eliminarNota();
              guardarNota();
              i++
              keyText++
              keyTitle++
              numClick++
          }
      }
  }
});

// Adiciona um evento de clique ao botão "Excluir Tudo"
deleteAllNote.addEventListener("click", (e) => {
  let resposta = confirm("Tem certeza de que deseja excluir Tudo?");
  if(resposta){
      localStorage.clear();
      while(notes.firstChild) {
        notes.removeChild(notes.firstChild);
      }
  }
});
