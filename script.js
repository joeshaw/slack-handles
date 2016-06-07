function updateMessageSenderNodes(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
    }

    for (var i = 0; i < node.childNodes.length; i++) {
        updateMessageSenderNodes(node.childNodes[i]);
    }

    if (node.classList.contains("message_sender")) {
        var name = node.textContent;
        var nick = node.getAttribute("target").slice(6);

        if (name != nick) {
            node.textContent = name + " (@" + nick + ")";
        }
    }
}

var msgs_div = document.getElementById("msgs_div");

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            updateMessageSenderNodes(mutation.addedNodes[i]);
        }
    });
});

var config = { childList: true, subtree: true };

observer.observe(msgs_div, config);
