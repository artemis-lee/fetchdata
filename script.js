 const button = document.getElementById('button');
 const list =  document.getElementById('users');
 const message = document.getElementById('message');
 
 function throttle (func, delay) {
    let isThrottled = false;

    function wrapper () {
        if (isThrottled) return;

        func.apply(this, arguments);

        isThrottled = true;
        
        setTimeout(function() {
            isThrottled = false;
        }, delay)
    }
    return wrapper
 }


 async function fetchData() {
    list.innerHTML = ' ';
    message.textContent = "Fetching users... Please wait.";
    try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    const data = await response.json();
    data.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.name;
        list.appendChild(li);
    });
    } 
    catch(e) {
        console.error("Fetch error", e);
        message.textContent = "Failed to load users";
        message.style.color = 'red'
    }

}
button.addEventListener('click', throttle(fetchData, 2000))

console.log('Hello');
