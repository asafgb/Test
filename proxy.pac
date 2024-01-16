function FindProxyForURL(url, host) {
    // NetBIOS-names
    if (isPlainHostName(host))
        return "DIRECT";
    // change to lower case, if not already been done
    host = host.toLowerCase();
    // internal DNS-suffixes
    if (shExpMatch(host, "*.corp.company.com") ||
        shExpMatch(host, "*.dns.company.com"))
        return "DIRECT";
    // Save the IP-address to variable hostIP
    var hostIP;
    var isIpV4Addr = /^(\d+.){3}\d+$/;
    if (isIpV4Addr.test(host))
        hostIP = host;
    else
        hostIP = dnsResolve(host);
    // IP could not be determined -> go to proxy
    if (hostIP == 0)
        return "PROXY myproxy:80";
    // These 3 scopes are used only internally
    if (shExpMatch(hostIP, "95.53.*") ||
        shExpMatch(hostIP, "192.168.*") ||
        shExpMatch(hostIP, "127.0.0.1"))
        return "DIRECT";
    // Eveything else goes through the proxy
    return "PROXY myproxy:80;";
}
