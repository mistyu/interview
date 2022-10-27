const myInstanceof = (instantiation, Class) => {
  let insProto = instantiation.__proto__

  while (insProto) {
    if (insProto === Class.proptotype) {
      return true
    }
    insProto = insProto.__proto__
  }

  return false
}
