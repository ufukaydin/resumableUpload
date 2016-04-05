var SecimHub = $.hubConnection('/signalr', { qs:'', useDefaultPath: true }); 
SecimHub.start({ transport: ['webSockets', 'serverSentEvents', 'longPolling', 'foreverFrame'], waitForPageLoad: true }).done(function () {
     invokelar();
});

SecimHub.connectionSlow(function () {
    console.warn("Bağlantı Yavaş");
});

SecimHub.error(function (error) {
    setTimeout(function () {
        SecimHub.start({ transport: ['webSockets', 'serverSentEvents', 'longPolling', 'foreverFrame'], waitForPageLoad: true }).done(function () {
            // invokelar();
        });
    }, 3000);
});
SecimHub.disconnected(function () {
    setTimeout(function () {
        SecimHub.start({ transport: ['webSockets', 'serverSentEvents', 'longPolling', 'foreverFrame'], waitForPageLoad: true }).done(function () {
           // invokelar();
        });
    }, 3000); 
});