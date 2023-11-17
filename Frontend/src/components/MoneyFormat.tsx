
function formatMoneyInput(event: { target: { value: string; }; key: string; preventDefault: () => void; }) {
    // Remove qualquer formatação anterior para obter um número limpo
    let value = event.target.value.replace(/[^0-9,.]/g, '');
    
    // Converta para um número flutuante e formate como moeda
    value = parseFloat(value.replace(/,/g, '.')).toFixed(2);
    
    // Atualize o valor do campo com a formatação de moeda
    event.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Prevenir caracteres não numéricos
    if (/[^0-9,.]/.test(event.key)) {
        event.preventDefault();
    }
}


export default formatMoneyInput 