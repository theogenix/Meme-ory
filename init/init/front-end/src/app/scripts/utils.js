// TODO #export-functions: export function parseUrl
function parseUrl(url = window.location.href) {
  var query = url.split("?")[1] || "";
  var result = {};

  var parts = query.split("&");
  // TODO #functional-programming: Use Array.map() & Array.reduce()
  for (var i in parts) {
    var item = parts[i];
    var kv = item.split("=");
    result[kv[0]] = kv[1];
  }

  return result;
}
