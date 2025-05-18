export function unwrapJsonp(jsonp: string): any {
  const json = jsonp.replace(/^[^{]*({.*})[^}]*$/, "$1");
  return JSON.parse(json);
}
