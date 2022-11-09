func replaceSpace(s string) string {
  var res []byte
  for i := range s {
    if s[i] == ' ' {
      res = append(res, '%', '2', '0')
    } else {
      res = append(res, s[i])
    }
  }
  return string(res)
}
