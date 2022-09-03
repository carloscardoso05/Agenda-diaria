if('Notification' in window){

    if(Notification.permission !== 'denied'){
        const titulo = "O título";
        const options = {
            body: 'Olá, isto é uma notificação'
        }
        const notif = new Notification(titulo, options)
    }

} else {
    Notification.requestPermission()
    .then((result) => {
        console.log(result);
    })
    .catch((erro) => {
        console.log(erro);
    })
}