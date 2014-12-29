(function() {
    var request = new XMLHttpRequest();
    var localScriptUrl = 'https://localhost:3131/' + location.hostname.replace(/^www\./, '') + '.js';
    request.open('GET', localScriptUrl, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var firstScript = document.getElementsByTagName('script')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = localScriptUrl;

            firstScript.parentNode.insertBefore(script, firstScript);
            console.log('Appended the script from dotjs');
        } else {
            // We reached our target server, but it returned an error
            console.warn('no dotjs server found at localhost:3131');
        }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.error('Could not connect to local dotjs server');
    };

    request.send();

})();
