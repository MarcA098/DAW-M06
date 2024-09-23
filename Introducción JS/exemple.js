
function sumaValors() {
    let input_numero = document.getElementById("input_numero");
    let input_numero2 = document.getElementById("input_numero2");
    let numero = parseInt(input_numero.value);
    let numero2 = parseInt(input_numero2.value);
    let resultat = document.getElementById("resultat"); 
    resultat.innerText = numero + numero2; 
}
