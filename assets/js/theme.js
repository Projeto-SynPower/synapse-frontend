/* Aplica o tema antes da pintura, para não piscar. */
(function () {
  var salvo = null;
  try { salvo = localStorage.getItem("synapse-tema"); } catch (e) {}
  var escuro = salvo ? salvo === "escuro" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (escuro) document.documentElement.classList.add("dark");
})();
