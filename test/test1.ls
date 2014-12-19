/**
 * User: moye
 * Date: 14/12/18
 * Time: 下午9:23
 */
factorial = (n, m) ->
  if n == 0
    m
  else
    factorial n-1, n*m

console.log factorial 6, 1