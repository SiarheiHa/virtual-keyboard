export default (tag, classes, inner) => {
  let node;
  if (tag) {
    node = document.createElement(tag);
  }
  if (classes) {
    node.classList.add(...classes);
  }
  if (inner) {
    node.innerText = inner;
  }
  return node;
};
