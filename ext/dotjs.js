(function() {
    var request = new XMLHttpRequest();
    var localScriptUrl = 'https://localhost:3131/' + location.hostname.replace(/^www\./, '') + '.js';
    request.open('GET', localScriptUrl, true);

    request.onload = function() {
        if (request.status == 200) {
            // Success!
            var firstScript = document.getElementsByTagName('script')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = localScriptUrl;

            if (firstScript) {
                firstScript.parentNode.insertBefore(script, firstScript);
                console.log('Appended before first script from dotjs');
            } else if (document.head) {
                document.head.appendChild(script);
                console.log('Appended to head script from dotjs');
            } else if (document.body) {
                document.body.appendChild(script);
                console.log('Appended to body script from dotjs');
            }
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
