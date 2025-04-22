 const button = document.querySelector('.button');
 const list =  document.querySelector('.users');
 const message = document.querySelector('.message');
 
 function throttle (func, delay) {

    function wrapper () {

    }
    return wrapper
 }

 button.addEventListener('onclick')
 function fetchData() {
    message.textContent = "Fetching users... Please wait."
    setTimeout(async () => {
        try {
            const response = await fetch ('https://jsonplaceholder.typicode.com/users');
            const data = response.json();
            console.log(data);
            
             
            }
        catch(e) {

        }
    }, 2000);

}

console.log('Hello');
