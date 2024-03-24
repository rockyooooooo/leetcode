/**
 * @param {any} o1
 * @param {any} o2
 * @return {boolean}
 */
var areDeeplyEqual = function(o1, o2) {
  if (isNull(o1) && isNull(o2)) {
    return true
  }
  if (isNull(o1) !== isNull(o2)) {
    return false
  }

  if (
    typeof o1 !== typeof o2 ||
    Array.isArray(o1) !== Array.isArray(o2)
  ) {
    return false
  }

  if (typeof o1 === 'object') {
    if (Object.keys(o1).length !== Object.keys(o2).length) {
      return false
    }

    for (const key in o1) {
      if (typeof o1[key] === 'object') {
        if (!areDeeplyEqual(o1[key], o2[key])) {
          return false
        }
      }
      else if (o1[key] !== o2[key]) {
        return false
      }
    }
    return true
  }

  return o1 === o2
};

function isNull(val) {
  return val === null
}

const o1 = {"x":null,"L":[1,2,3]}
const o2 = {"x":null,"L":["1","2","3"]}
console.log(areDeeplyEqual(o1, o2))